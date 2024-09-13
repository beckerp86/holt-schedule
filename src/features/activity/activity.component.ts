import { Activity } from '../../models/ActivityModel';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AudioService } from '../../sevices/audio.service';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  Subject,
  takeUntil,
} from 'rxjs';
import { NumberUtil } from '../../utils/NumberUtil';
import { ResizeObservableService } from '../../sevices/resize-observable.service';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';
import { TimeUtil } from '../../utils/TimeUtil';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public activity?: Activity;

  @ViewChild('timerIcon', { static: false }) public timerIcon!: ElementRef;

  public timeService = inject(TimeService);
  public scheduleService = inject(ScheduleService);
  private resizeService = inject(ResizeObservableService);
  private audioService = inject(AudioService);

  public htmlId = crypto.randomUUID();
  private _containerElement: HTMLElement | null = null;

  private ngUnsubscribe$ = new Subject();
  private isComplete = false;
  private playedWarningChime = false;

  private _startMs: number = 0;
  private _endMs: number = 0;

  private percentCompleteSubject = new BehaviorSubject<number>(0);
  public percentComplete$ = this.percentCompleteSubject.asObservable();

  private progressBarCurrentPixelWidthSubject = new BehaviorSubject<number>(0);
  public progressBarCurrentPixelWidth$ =
    this.progressBarCurrentPixelWidthSubject.asObservable();

  private countdownDisplaySubject = new BehaviorSubject<string>('');
  public countdownDisplay$ = this.countdownDisplaySubject.asObservable();

  private progressBarContainerPixelWidthSubject = new BehaviorSubject<number>(
    1920
  );
  public progressBarContainerPixelWidth$ =
    this.progressBarContainerPixelWidthSubject.asObservable();

  private canLeaveClassSubject = new BehaviorSubject<boolean>(false);
  public canLeaveClass$ = this.canLeaveClassSubject.asObservable();

  constructor() {
    this.initSubscriptions();
  }

  ngOnInit(): void {
    this._startMs = this.activity?.startDate?.getTime() ?? 0;
    this._endMs = this.activity?.endDate?.getTime() ?? 0;
  }

  ngAfterViewInit(): void {
    //add classmembers references to html elements
    this._containerElement = document.getElementById(this.htmlId);

    // Add resize observer to progress bar container
    this.resizeService
      .widthResizeObservable(this._containerElement!)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((widthPx: number) => {
        this.progressBarContainerPixelWidthSubject.next(widthPx);
      });

    // Watch for intended width of actual progress bar, then go update the style
    this.progressBarCurrentPixelWidth$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((widthPx: number) => {
        this.updateProgressBarWidth(widthPx);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private async updatePercentComplete(nowMs: number): Promise<void> {
    let percentComplete =
      (nowMs - this._startMs) / (this._endMs - this._startMs);
    percentComplete > 1 ? 1 : percentComplete; // cap percent complete at 100%

    this.percentCompleteSubject.next(percentComplete);
  }

  private async updateCountdownDisplay(now: Date): Promise<void> {
    if (!this.activity) {
      return;
    }
    const duration = TimeUtil.getDurationBetweenDates(
      now,
      this.activity.endDate
    );
    this.countdownDisplaySubject.next(TimeUtil.getTimerDisplay(duration));
  }

  private updateProgressBarWidth(widthPx: number): void {
    if (!this.activity) {
      return;
    }

    // Sets pseudo element's width inline
    this._containerElement?.style.setProperty('--before-width', `${widthPx}px`);
    if (this.isComplete) {
      this.ngUnsubscribe$.next(null);
      this.ngUnsubscribe$.complete();
      this._containerElement?.classList.add('falling');
    }
  }

  private async playWarningChime(nowMs: number): Promise<void> {
    if (
      !this.activity ||
      this.playedWarningChime ||
      !NumberUtil.IsPositiveInteger(this.activity.warnWhenMinutesRemain)
    ) {
      return;
    }
    const chimeMs =
      this._endMs - this.activity.warnWhenMinutesRemain * 60 * 1000;
    if (nowMs >= chimeMs) {
      this.makeTimerJump();
      this.playedWarningChime = true;
      this.soundTheAlarm();
    }
  }

  private makeTimerJump(): void {
    this.timerIcon.nativeElement.classList.add('jump-shake');
  }

  private soundTheAlarm(): void {
    this.audioService.howlChime();
    // this.audioService.howlSeatbelt();
  }

  private async updateCanLeaveClass(nowMs: number): Promise<void> {
    if (
      this.activity === undefined ||
      this.activity.isInstructionalTime !== true ||
      this.activity.canLeaveClassStart === undefined ||
      this.activity.canLeaveClassEnd === undefined ||
      this.activity.parentSchedule === undefined
    ) {
      return;
    }

    const allowedByTenMinuteRule = TimeUtil.isTimeBetweenInclusive(
      nowMs,
      this.activity.canLeaveClassStart!.getTime(),
      this.activity.canLeaveClassEnd!.getTime()
    );
    if (!allowedByTenMinuteRule) {
      this.canLeaveClassSubject.next(allowedByTenMinuteRule);
      return;
    }
    const allowedByLunchRule =
      !this.activity.parentSchedule?.isInBlackoutTime(nowMs);
    this.canLeaveClassSubject.next(allowedByLunchRule);
  }

  private async initSubscriptions(): Promise<void> {
    // updates percent complete observable
    this.timeService.currentDateTime$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(async (now: Date) => {
        const nowMs = now.getTime();
        Promise.all([
          this.updatePercentComplete(nowMs),
          this.updateCountdownDisplay(now),
          this.playWarningChime(nowMs),
          this.updateCanLeaveClass(nowMs),
        ]);
      });

    // updates progress bar width observable
    combineLatest([this.percentComplete$, this.progressBarContainerPixelWidth$])
      .pipe(debounceTime(100), takeUntil(this.ngUnsubscribe$))
      .subscribe(([percentComplete, progressBarContainerPixelWidth]) => {
        if (
          Number.isNaN(percentComplete) ||
          !Number.isFinite(percentComplete) ||
          Number.isNaN(progressBarContainerPixelWidth) ||
          !Number.isFinite(progressBarContainerPixelWidth)
        ) {
          return;
        }
        this.isComplete = percentComplete >= 1;
        const nextWidth = Math.floor(
          percentComplete * progressBarContainerPixelWidth
        );
        this.progressBarCurrentPixelWidthSubject.next(nextWidth);
      });
  }
}
