import { DailySchedule } from '../models/DailySchedule';
import { ScheduleTypeEnum } from '../models/ScheduleTypeEnum';
import { TimeService } from './time.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleOverrideService {
  constructor() {}
  private timeService = inject(TimeService);

  private readonly _noSchoolOverrides: IScheduleOverride[] = [
    {
      date: new Date(2024, 9, 14),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Fall Break',
    },
    {
      date: new Date(2024, 9, 15),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Fall Break',
    },
    {
      date: new Date(2024, 9, 16),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Fall Break',
    },
    {
      date: new Date(2024, 9, 17),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Fall Break',
    },
    {
      date: new Date(2024, 9, 18),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Fall Break',
    },
    {
      date: new Date(2024, 10, 5),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Election Day',
    },
    {
      date: new Date(2024, 10, 27),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Thanksgiving Break',
    },
    {
      date: new Date(2024, 10, 28),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Thanksgiving Break',
    },
    {
      date: new Date(2024, 10, 29),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Thanksgiving Break',
    },
    {
      date: new Date(2024, 11, 23),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 24),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 25),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 26),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 27),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 30),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2024, 11, 31),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2025, 0, 1),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2025, 0, 2),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2025, 0, 3),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Winter Break',
    },
    {
      date: new Date(2025, 0, 20),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'MLK Jr. Day',
    },
    {
      date: new Date(2025, 1, 14),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Mid-Winter Break',
    },
    {
      date: new Date(2025, 1, 17),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Mid-Winter Break',
    },
    {
      date: new Date(2025, 2, 21),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 2, 24),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 2, 25),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 2, 26),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 2, 27),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 2, 28),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Spring Break',
    },
    {
      date: new Date(2025, 4, 23),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Memorial Day Break',
    },
    {
      date: new Date(2025, 4, 26),
      scheduleType: ScheduleTypeEnum.NoSchool,
      reason: 'Memorial Day Break',
    },
  ];

  private readonly _halfDayOverrides: IScheduleOverride[] = [
    {
      date: new Date(2024, 8, 26),
      scheduleType: ScheduleTypeEnum.HalfDay1Through3,
      reason: 'Parent/Teacher Conferences',
    },
    {
      date: new Date(2024, 8, 27),
      scheduleType: ScheduleTypeEnum.HalfDay4Through6,
      reason: 'Parent/Teacher Conferences',
    },
    {
      date: new Date(2025, 0, 15),
      scheduleType: ScheduleTypeEnum.HalfDay1And2,
      reason: 'Exams',
    },
    {
      date: new Date(2025, 0, 16),
      scheduleType: ScheduleTypeEnum.HalfDay3And4,
      reason: 'Exams',
    },
    {
      date: new Date(2025, 0, 17),
      scheduleType: ScheduleTypeEnum.HalfDay5And6,
      reason: 'Exams',
    },
    {
      date: new Date(2025, 2, 6),
      scheduleType: ScheduleTypeEnum.HalfDay1Through3,
      reason: 'Parent/Teacher Conferences',
    },
    {
      date: new Date(2025, 2, 7),
      scheduleType: ScheduleTypeEnum.HalfDay4Through6,
      reason: 'Parent/Teacher Conferences',
    },
    {
      date: new Date(2025, 5, 10),
      scheduleType: ScheduleTypeEnum.HalfDay1And2,
      reason: 'Exams',
    },
    {
      date: new Date(2025, 5, 11),
      scheduleType: ScheduleTypeEnum.HalfDay3And4,
      reason: 'Exams',
    },
    {
      date: new Date(2025, 5, 12),
      scheduleType: ScheduleTypeEnum.HalfDay5And6,
      reason: 'Exams',
    },
  ];

  private readonly _pepRallyOverrides: IScheduleOverride[] = [
    {
      date: new Date(2024, 8, 27),
      scheduleType: ScheduleTypeEnum.PepRally,
    },
    // {
    //   // TODO: Get Pep Rally dates from Heather
    //   date: new Date(2024, 8, 27),
    //   scheduleType: ScheduleTypeEnum.PepRally,
    // },
  ];

  private readonly _earlyReleaseWednesdayOverrides: IScheduleOverride[] = [
    {
      date: new Date(2024, 8, 11),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 9, 9),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 9, 23),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 10, 6),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 10, 20),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 11, 4),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2024, 11, 11),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 0, 8),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 0, 22),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 1, 5),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 1, 19),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 2, 12),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 2, 19),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 3, 2),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 3, 23),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 4, 7),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 4, 21),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
    {
      date: new Date(2025, 4, 28),
      scheduleType: ScheduleTypeEnum.EarlyRelease,
    },
  ];

  private readonly _overrides: IScheduleOverride[] = [
    ...this._noSchoolOverrides,
    ...this._halfDayOverrides,
    ...this._pepRallyOverrides,
    ...this._earlyReleaseWednesdayOverrides,
  ];

  todaySchedule$: Observable<DailySchedule> = this.timeService.dateChange$.pipe(
    map((date: Date) => {
      return new DailySchedule(this.getScheduleTypeForDate(date));
    })
  );

  /**
   * Returns null when the next schedule could not be resolved within the next 30 days.
   * SUMMER BREAK!
   * @type {(Observable<INextSchedule | null>)}
   */
  nextSchedule$: Observable<INextSchedule | null> = this.timeService.dateChange$.pipe(
    map((date: Date) => {
      // Check each day for the next 30 days to find the next school day.
      for (let i = 0; i < 30; i++) {
        date.setDate(date.getDate() + 1);
        const schedule = new DailySchedule(this.getScheduleTypeForDate(date));
        if (schedule.schedule?.type !== ScheduleTypeEnum.NoSchool) {
          return { date, schedule };
        }
      }
      return null;
    })
  );

  private getScheduleTypeForDate(date: Date): ScheduleTypeEnum {
    return this.getOverriddenScheduleTypeForDate(date) ?? this.getDefaultScheduleForDayOfWeek(date);
  }

  private getOverriddenScheduleTypeForDate(date: Date): ScheduleTypeEnum | undefined {
    return this._overrides.find(
      (x) =>
        x.date.getDate() === date.getDate() &&
        x.date.getMonth() === date.getMonth() &&
        x.date.getFullYear() === date.getFullYear()
    )?.scheduleType;
  }

  private getDefaultScheduleForDayOfWeek(date: Date): ScheduleTypeEnum {
    const dayOfWeek = date.getDay();
    switch (dayOfWeek) {
      case 1:
        return ScheduleTypeEnum.Standard; // Monday
      case 2:
        return ScheduleTypeEnum.RamTime; // Tuesday
      case 3:
        return ScheduleTypeEnum.Standard; // Wednesday
      case 4:
        return ScheduleTypeEnum.RamTime; // Thursday
      case 5:
        return ScheduleTypeEnum.Standard; // Friday
      default:
        return ScheduleTypeEnum.NoSchool;
    }
  }
}

export interface IScheduleOverride {
  date: Date;
  scheduleType: ScheduleTypeEnum;
  reason?: string;
}

export interface INextSchedule {
  date: Date;
  schedule: DailySchedule;
}
