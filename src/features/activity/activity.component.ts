import { Activity } from '../../models/ActivityModel';
import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, of, repeat, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResizeObservableService } from '../../sevices/resize-observable.service';
import { ScheduleOverrideService } from '../../sevices/schedule-override.service';
import { TimeService } from '../../sevices/time.service';
import { TimeUtil } from '../../utils/TimeUtil';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public activity?: Activity;

  public timeService = inject(TimeService);
  public scheduleOverrideService = inject(ScheduleOverrideService);
  private resizeService = inject(ResizeObservableService);

  public htmlId = crypto.randomUUID();
  private _containerElement: HTMLElement | null = null;

  private ngUnsubscribe$ = new Subject();
  private isComplete = false;

  private _startMs: number = 0;
  private _endMs: number = 0;

  private percentCompleteSubject = new BehaviorSubject<number>(0);
  public percentComplete$ = this.percentCompleteSubject.asObservable();

  private progressBarCurrentPixelWidthSubject = new BehaviorSubject<number>(0);
  public progressBarCurrentPixelWidth$ = this.progressBarCurrentPixelWidthSubject.asObservable();

  private countdownDisplaySubject = new BehaviorSubject<string>('');
  public countdownDisplay$ = this.countdownDisplaySubject.asObservable();

  private progressBarContainerPixelWidthSubject = new BehaviorSubject<number>(1920);
  public progressBarContainerPixelWidth$ = this.progressBarContainerPixelWidthSubject.asObservable();

  constructor() {
    // updates percent complete observable
    of(null)
      .pipe(repeat({ delay: 1000 }), takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.updatePercentComplete();
        this.updateCountdownDisplay();
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
        const nextWidth = Math.floor(percentComplete * progressBarContainerPixelWidth);
        this.progressBarCurrentPixelWidthSubject.next(nextWidth);
      });
  }

  ngOnInit(): void {
    this._startMs = this.activity?._startDate?.getTime() ?? 0;
    this._endMs = this.activity?._endDate?.getTime() ?? 0;
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
    this.progressBarCurrentPixelWidth$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((widthPx: number) => {
      this.updateProgressBarWidth(widthPx);
    });
  }

  ngOnDestroy(): void {
    // TODO: Some animation would be nice here
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private updatePercentComplete(): void {
    const nowMs = new Date().getTime();
    let percentComplete = (nowMs - this._startMs) / (this._endMs - this._startMs);
    percentComplete > 1 ? 1 : percentComplete; // cap percent complete at 100%

    this.percentCompleteSubject.next(percentComplete);
  }

  private updateCountdownDisplay(): void {
    if (!this.activity) {
      return;
    }
    const duration = TimeUtil.getDurationBetweenDates(new Date(), this.activity._endDate);
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
    }
  }
}
