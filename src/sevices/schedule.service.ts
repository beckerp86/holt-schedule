import { BehaviorSubject } from 'rxjs';
import { DailySchedule } from '../models/DailySchedule';
import { ScheduleTypeEnum } from '../models/ScheduleTypeEnum';
import { TimeService } from './time.service';
import { inject, Injectable } from '@angular/core';
import {
  noSchoolOverrides,
  halfDayOverrides,
  pepRallyOverrides,
  earlyReleaseWednesdayOverrides,
} from '../models/data/ScheduleOverrides';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {
    this.initSubscriptions();
  }

  private timeService = inject(TimeService);

  private _todaysScheduleSubject = new BehaviorSubject<
    DailySchedule | undefined
  >(undefined);
  public todaysSchedule$ = this._todaysScheduleSubject.asObservable();

  private _nextScheduleSubject = new BehaviorSubject<INextSchedule | null>(
    null
  );
  public nextSchedule$ = this._nextScheduleSubject.asObservable();

  private readonly _overrides: IScheduleOverride[] = [
    ...noSchoolOverrides,
    ...halfDayOverrides,
    ...pepRallyOverrides,
    ...earlyReleaseWednesdayOverrides,
  ];

  private getScheduleTypeForDate(date: Date): ScheduleTypeEnum {
    return (
      this.getOverriddenScheduleTypeForDate(date) ??
      this.getDefaultScheduleForDayOfWeek(date)
    );
  }

  private getOverriddenScheduleTypeForDate(
    date: Date
  ): ScheduleTypeEnum | undefined {
    return this._overrides.find(
      x =>
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

  private setTodaysSchedule(): void {
    const todaysSchedule = new DailySchedule(
      this.getScheduleTypeForDate(new Date())
    );
    this._todaysScheduleSubject.next(todaysSchedule);
  }

  private setNextSchedule(): void {
    const date = new Date();
    for (let i = 0; i < 30; i++) {
      date.setDate(date.getDate() + 1);
      const scheduleType = this.getScheduleTypeForDate(date);
      if (scheduleType !== ScheduleTypeEnum.NoSchool) {
        const schedule = new DailySchedule(scheduleType);
        this._nextScheduleSubject.next({ date, schedule });
        return;
      }
    }
    this._nextScheduleSubject.next(null);
  }

  private initSubscriptions(): void {
    this.timeService.dateChange$.subscribe(() => {
      this.setTodaysSchedule();
      this.setNextSchedule();
    });
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
