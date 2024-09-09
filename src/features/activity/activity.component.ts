import { Activity } from '../../models/ActivityModel';
import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable, of, repeat, Subject, takeUntil } from 'rxjs';
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

  private ngUnsubscribe$ = new Subject();

  private _startMs: number = 0;
  private _endMs: number = 0;

  private percentCompleteSubject = new BehaviorSubject<number>(0);
  public percentComplete$ = this.percentCompleteSubject.asObservable();

  private progressBarCurrentPixelWidthSubject = new BehaviorSubject<number>(0);
  public progressBarCurrentPixelWidth$ = this.progressBarCurrentPixelWidthSubject.asObservable();

  private countdownDisplaySubject = new BehaviorSubject<string>('');
  public countdownDisplay$ = this.countdownDisplaySubject.asObservable();

  public progressBarContainerPixelWidth$: Observable<number> = of(0);

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
        this.progressBarCurrentPixelWidthSubject.next(Math.floor(percentComplete * progressBarContainerPixelWidth));
      });
  }

  ngOnInit(): void {
    this._startMs = this.activity?._startDate?.getTime() ?? 0;
    this._endMs = this.activity?._endDate?.getTime() ?? 0;
  }

  ngAfterViewInit(): void {
    this.progressBarContainerPixelWidth$ = this.resizeService
    .widthResizeObservable(document.getElementById(this.htmlId)!)
    .pipe(takeUntil(this.ngUnsubscribe$));
  }

  ngOnDestroy(): void {
    // TODO: Some animation would be nice here
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private updatePercentComplete(): void {
    const nowMs = new Date().getTime();
    this.percentCompleteSubject.next((nowMs - this._startMs) / (this._endMs - this._startMs));
  }

  private updateCountdownDisplay(): void {
    if (!this.activity) {
      return;
    }
    const duration = TimeUtil.getDurationBetweenDates(new Date(), this.activity._endDate);
    this.countdownDisplaySubject.next(TimeUtil.getTimerDisplay(duration));
  }
}
