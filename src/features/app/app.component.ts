import { Activity } from '../../models/ActivityModel';
import { ActivityComponent } from '../activity/activity.component';
import { ArrayUtil } from '../../utils/ArrayUtil';
import { AsyncPipe, NgFor } from '@angular/common';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LocalStorageService } from '../../sevices/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    AsyncPipe,
    ActivityComponent,
    HeaderComponent,
    FooterComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private scheduleService = inject(ScheduleService);
  private timeService = inject(TimeService);
  private localStorageService = inject(LocalStorageService);

  private activities: Activity[] = [];

  private readonly _isDevTesting: boolean = false; // FIXME: Remove when done testing
  private readonly _animationTimeMs = 2000;

  private currentActivitiesSubject = new BehaviorSubject<Activity[]>([]);
  public currentActivities$ = this.currentActivitiesSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(faLibrary: FaIconLibrary, faConfig: FaConfig) {
    this.configureFontAwesomeLibrary(faLibrary, faConfig);
    this.handleDevTesting();

    // Every second, check to make sure only the active activities are displayed
    this.timeService.currentDateTime$.subscribe((now: Date) => {
      if (ArrayUtil.IsArrayAndHasItems(this.activities)) {
        this.updateCurrentActivities(now);
      }
    });

    // When date changes, fetch new day's schedule
    this.timeService.dateChange$.subscribe(() => {
      // add parent schedule to each activity
      const schedule = this.scheduleService.todaysSchedule$()?.schedule;
      if (schedule === undefined) {
        return; // no school today
      }
      if (ArrayUtil.IsArrayAndHasItems(schedule.activities)) {
        const activitiesWithSchedule: Activity[] = [];
        for (const activity of schedule.activities) {
          if (this.localStorageService.isDevTestingWithCustomDate) {
            activity.recalculateDatesForRefDate(
              this.localStorageService.devModeEmulatedDateTime as Date
            );
          }
          activitiesWithSchedule.push(activity);
        }
        this.activities = activitiesWithSchedule;
        return;
      }
      this.activities = [];
    });
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
      this.localStorageService.setNewDevModeEmulatedDateTime(undefined);
      return;
    }

    // Set the date here where we want to start testing from.
    const customDate = new Date(2024, 9, 5, 9, 44, 50);
    this.localStorageService.setDevModeEnabledState(true);
    this.localStorageService.setNewDevModeEmulatedDateTime(customDate);
  }

  private configureFontAwesomeLibrary(
    faLibrary: FaIconLibrary,
    faConfig: FaConfig
  ): void {
    faLibrary.addIcons(faBullhorn, faBellSlash, faBell);
    faConfig.fixedWidth = true;
  }
}
