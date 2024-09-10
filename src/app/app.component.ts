import { Activity, ActivityTypeEnum } from '../models/ActivityModel';
import { ActivityComponent } from '../features/activity/activity.component';
import { ArrayUtil } from '../utils/ArrayUtil';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../features/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ScheduleOverrideService } from '../sevices/schedule-override.service';
import { TimeService } from '../sevices/time.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ActivityComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private scheduleOverrideService = inject(ScheduleOverrideService);
  private timeService = inject(TimeService);

  private activities: Activity[] = [];

  private readonly _isDevTesting: boolean = false; // FIXME: Remove when done testing
  private readonly _animationTimeMs = 2000;

  private currentActivitiesSubject = new BehaviorSubject<Activity[]>([]);
  public currentActivities$ = this.currentActivitiesSubject.asObservable().pipe(distinctUntilChanged());

  constructor() {
    // Every second, check to make sure only the active activities are displayed
    this.timeService.currentDateTime$.subscribe((now: Date) => {
      if (ArrayUtil.IsArrayAndHasItems(this.activities)) {
        this.updateCurrentActivities(now);
      }
    });

    if (this._isDevTesting) {
      this.handleDevTesting();
      return;
    }
    // When date changes, fetch new day's schedule
    this.scheduleOverrideService.todaySchedule$.subscribe((schedule) => {
      if (schedule) {
        this.activities = schedule.schedule?.activities ?? [];
      }
    });
  }

  private updateCurrentActivities(now: Date): void {
    const nowMs = now.getTime();
    const animationEndMs = nowMs - this._animationTimeMs;
    const currentActivities = this.activities.filter(
      (x: Activity) => nowMs >= x._startDate.getTime() && animationEndMs <= x._endDate.getTime()
    );
    this.currentActivitiesSubject.next(currentActivities);
  }

  private handleDevTesting(): void {
    if (!this._isDevTesting) return;
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const activity1 = new Activity(ActivityTypeEnum.FirstHour, nowHours, nowMinutes, 4, 2);
    const activity2 = new Activity(ActivityTypeEnum.SecondHour, nowHours, nowMinutes, 3, 2);
    const activity3 = new Activity(ActivityTypeEnum.Transition, nowHours, nowMinutes, 1);
    this.activities = [activity3, activity2, activity1];
    this.currentActivitiesSubject.next(this.activities);
  }
}
