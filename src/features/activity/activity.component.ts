import { Activity, ActivityTypeEnum } from '../../models/ActivityModel';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NumberUtil } from '../../utils/NumberUtil';
import { ResizeObservableService } from '../../sevices/resize-observable.service';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';
import { TimeUtil } from '../../utils/TimeUtil';
import { ScheduleTypeEnum } from '../../models/ScheduleTypeEnum';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass, FontAwesomeModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public activity?: Activity;

  public timeService = inject(TimeService);
  public scheduleService = inject(ScheduleService);
  private resizeService = inject(ResizeObservableService);
  private audioService = inject(AudioService);

  public animateBullhorn = false;
  public htmlId = crypto.randomUUID();
  private _containerElement: HTMLElement | null = null;

  private ngUnsubscribe$ = new Subject();
  private isComplete = false;
  public playedWarningChime = false;

  private _startMs = 0;
  private _endMs = 0;

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

  public canLeaveClass$ = signal(false);
  public isAnnouncementRequired$ = signal(false);
  public announcementWarningTime$ = signal<Date | undefined>(undefined);
  public shouldAnimateBullhorn$ = signal(false);

  constructor() {
    this.initSubscriptions();
  }

  ngOnInit(): void {
    this._startMs = this.activity?.startDate?.getTime() ?? 0;
    this._endMs = this.activity?.endDate?.getTime() ?? 0;
    this.setAnnouncementTime();
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
    this.completeSub();
  }

  private async updatePercentComplete(nowMs: number): Promise<void> {
    if (this._startMs === 0 || this._endMs === 0 || nowMs === 0) {
      return;
    }

    let percentComplete =
      (nowMs - this._startMs) / (this._endMs - this._startMs);
    percentComplete = percentComplete > 1 ? 1 : percentComplete; // cap percent complete at 100%

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
      this.playedWarningChime = true;
      this.soundTheAlarm();
    }
  }

  private soundTheAlarm(): void {
    this.audioService.playWarningSound();
  }

  private async updateCanLeaveClass(nowMs: number): Promise<void> {
    if (
      this.activity === undefined ||
      this.activity.isInstructionalTime !== true ||
      this.activity.canLeaveClassStart === undefined ||
      this.activity.canLeaveClassEnd === undefined
    ) {
      return;
    }

    const allowedByTenMinuteRule = TimeUtil.isTimeBetweenInclusive(
      nowMs,
      this.activity.canLeaveClassStart!.getTime(),
      this.activity.canLeaveClassEnd!.getTime()
    );
    if (!allowedByTenMinuteRule) {
      this.canLeaveClass$.set(allowedByTenMinuteRule);
      return;
    }
    const allowedByLunchRule = !this.scheduleService.areLunchesActive$();
    this.canLeaveClass$.set(allowedByLunchRule);
  }

  private async updateAnnouncementTime(nowMs: number): Promise<void> {
    if (
      this.isAnnouncementRequired$() === true &&
      this.announcementWarningTime$() !== undefined
    ) {
      this.shouldAnimateBullhorn$.set(
        nowMs >= this.announcementWarningTime$()!.getTime()
      );
    }
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
          this.updateAnnouncementTime(nowMs),
        ]);
      });

    // updates progress bar width observable
    combineLatest([this.percentComplete$, this.progressBarContainerPixelWidth$])
      .pipe(debounceTime(100), takeUntil(this.ngUnsubscribe$))
      .subscribe(([percentComplete, progressBarContainerPixelWidth]) => {
        if (
          !NumberUtil.isNumber(percentComplete) ||
          !NumberUtil.isNumber(progressBarContainerPixelWidth)
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

  private completeSub(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private setAnnouncementTime(): void {
    const parentScheduleType =
      this.scheduleService.todaysSchedule$()?.schedule?.type;
    if (parentScheduleType === undefined) {
      throw Error('Schedule Type could not be resolved.');
    }

    if (this.activity?.type === undefined) {
      throw Error('Activity Type could not be resolved.');
    }

    const secondHourSchedules: ScheduleTypeEnum[] = [
      ScheduleTypeEnum.Standard,
      ScheduleTypeEnum.EarlyRelease,
      ScheduleTypeEnum.PepRally,
      ScheduleTypeEnum.HalfDay1Through3,
    ];
    if (
      secondHourSchedules.includes(parentScheduleType) &&
      this.activity.type === ActivityTypeEnum.SecondHour
    ) {
      this.enableAnnouncementTime();
      return;
    }

    const fifthHourSchedules: ScheduleTypeEnum[] = [
      ScheduleTypeEnum.HalfDay4Through6,
    ];
    if (
      fifthHourSchedules.includes(parentScheduleType) &&
      this.activity.type === ActivityTypeEnum.FifthHour
    ) {
      this.enableAnnouncementTime();
      return;
    }

    const sixthHourSchedules: ScheduleTypeEnum[] = [ScheduleTypeEnum.RamTime];
    if (
      sixthHourSchedules.includes(parentScheduleType) &&
      this.activity.type === ActivityTypeEnum.SixthHour
    ) {
      this.enableAnnouncementTime();
    }
  }

  private enableAnnouncementTime(): void {
    this.isAnnouncementRequired$.set(true);
    if (this.activity?.endDate === undefined) {
      throw Error('End Date could not be resolved for Activity.');
    }
    this.announcementWarningTime$.set(
      TimeUtil.addMinutes(this.activity?.endDate, -10)
    );
  }

  private updateProgressBarWidth(widthPx: number): void {
    if (!this.activity) {
      return;
    }

    // Sets pseudo element's width inline
    this._containerElement?.style.setProperty('--before-width', `${widthPx}px`);
    if (this.isComplete) {
      this._containerElement?.classList.add('falling');
      this.completeSub();
    }
  }
}
