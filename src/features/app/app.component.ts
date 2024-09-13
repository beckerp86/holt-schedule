import { Activity } from '../../models/ActivityModel';
import { ActivityComponent } from '../activity/activity.component';
import { ArrayUtil } from '../../utils/ArrayUtil';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DailySchedule } from '../../models/DailySchedule';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../sevices/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ActivityComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private scheduleService = inject(ScheduleService);
  private timeService = inject(TimeService);
  private localStorageService = inject(LocalStorageService);

  private activities: Activity[] = [];

  private readonly _isDevTesting: boolean = true; // FIXME: Remove when done testing
  private readonly _animationTimeMs = 2000;

  private currentActivitiesSubject = new BehaviorSubject<Activity[]>([]);
  public currentActivities$ = this.currentActivitiesSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() {
    this.handleDevTesting();

    // Every second, check to make sure only the active activities are displayed
    this.timeService.currentDateTime$.subscribe((now: Date) => {
      if (ArrayUtil.IsArrayAndHasItems(this.activities)) {
        this.updateCurrentActivities(now);
      }
    });

    // When date changes, fetch new day's schedule
    this.scheduleService.todaysSchedule$.subscribe(
      (schedule: DailySchedule | undefined) => {
        // add parent schedule to each activity
        if (ArrayUtil.IsArrayAndHasItems(schedule?.schedule?.activities)) {
          const activitiesWithSchedule: Activity[] = [];
          for (let i = 0; i < schedule!.schedule!.activities.length; i++) {
            const activity = schedule!.schedule!.activities[i];
            activity.parentSchedule = schedule?.schedule;
            activitiesWithSchedule.push(activity);
          }
          this.activities = activitiesWithSchedule;
          return;
        }
        this.activities = [];
      }
    );
  }

  private updateCurrentActivities(now: Date): void {
    const nowMs = now.getTime();
    const animationEndMs = nowMs - this._animationTimeMs;
    const currentActivities = this.activities.filter(
      (x: Activity) =>
        nowMs >= x.startDate.getTime() && animationEndMs <= x.endDate.getTime()
    );
    this.currentActivitiesSubject.next(currentActivities);
  }

  private handleDevTesting(): void {
    if (!this._isDevTesting) {
      this.localStorageService.setDevModeEnabledState(false);
      this.localStorageService.setNewDevModeEmulatedDateTime(undefined);
      return;
    }

    // Set the date here where we want to start testing from.
    const now = new Date(2024, 8, 12, 12, 28, 50);
    this.localStorageService.setDevModeEnabledState(true);
    this.localStorageService.setNewDevModeEmulatedDateTime(now);
  }
}
