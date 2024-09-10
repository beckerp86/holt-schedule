import { Activity, ActivityTypeEnum } from '../models/ActivityModel';
import { ActivityComponent } from '../features/activity/activity.component';
import { ArrayUtil } from '../utils/ArrayUtil';
import { BehaviorSubject, distinctUntilChanged, of, repeat } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../features/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ScheduleOverrideService } from '../sevices/schedule-override.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ActivityComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private scheduleOverrideService = inject(ScheduleOverrideService);

  private activities: Activity[] = [];
  private _isDevTesting: boolean = true;

  private currentActivitiesSubject = new BehaviorSubject<Activity[]>([]);
  public currentActivities$ = this.currentActivitiesSubject.asObservable().pipe(distinctUntilChanged());

  constructor() {
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

    // Every second, check to make sure only the active activities are displayed
    of(null)
      .pipe(repeat({ delay: 1000 }))
      .subscribe(() => {
        if (ArrayUtil.IsArrayAndHasItems(this.activities)) {
          this.updateCurrentActivities();
        }
      });
  }

  private updateCurrentActivities(): void {
    const nowHour = new Date().getHours();
    const nowMinute = new Date().getMinutes();
    const currentActivities = this.activities.filter((x: Activity) => {
      return (
        (nowHour > x._startHour || (nowHour === x._startHour && nowMinute >= x._startMinute)) &&
        (nowHour < x._endDate.getHours() || (nowHour === x._endDate.getHours() && nowMinute <= x._endDate.getMinutes()))
      );
    });
    this.currentActivitiesSubject.next(currentActivities);
  }

  private handleDevTesting(): void {
    if (!this._isDevTesting) return;
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const activity1 = new Activity(ActivityTypeEnum.FirstHour, nowHours, nowMinutes, 3, 2);
    const activity2 = new Activity(ActivityTypeEnum.SecondHour, nowHours, nowMinutes, 2, 1);
    const activity3 = new Activity(ActivityTypeEnum.Transition, nowHours, nowMinutes, 1);
    this.activities = [activity1, activity2, activity3];
    this.currentActivitiesSubject.next(this.activities);
  }
}
