import { DailySchedule } from '../models/DailySchedule';
import { LocalStorageService } from './local-storage.service';
import { ScheduleTypeEnum } from '../models/ScheduleTypeEnum';
import { TimeService } from './time.service';
import { TimeUtil } from '../utils/TimeUtil';
import { inject, Injectable, signal } from '@angular/core';
import { scheduleOverrides } from '../models/data/ScheduleOverrides';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private timeService = inject(TimeService);
  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.initSubscriptions();
    this.printNext30DaysToConsole();
  }
  public todaysSchedule$ = signal<DailySchedule | undefined>(undefined);
  public nextSchedule$ = signal<INextSchedule | null>(null);
  public areLunchesActive$ = signal(false);

  private getScheduleTypeForDate(date: Date): ScheduleTypeEnum {
    return (
      this.getOverriddenScheduleTypeForDate(date) ??
      this.getDefaultScheduleForDayOfWeek(date)
    );
  }

  private getOverriddenScheduleTypeForDate(
    date: Date
  ): ScheduleTypeEnum | undefined {
    return scheduleOverrides.find(
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
    const scheduleDate = this.localStorageService.isDevTestingWithCustomDate
      ? (this.localStorageService.devModeEmulatedDateTime as Date)
      : new Date();
    const todaysSchedule = new DailySchedule(
      this.getScheduleTypeForDate(scheduleDate)
    );
    this.todaysSchedule$.set(todaysSchedule);
  }

  private setNextSchedule(): void {
    const date = new Date();
    for (let i = 0; i < 30; i++) {
      date.setDate(date.getDate() + 1);
      const scheduleType = this.getScheduleTypeForDate(date);
      if (scheduleType !== ScheduleTypeEnum.NoSchool) {
        const schedule = new DailySchedule(scheduleType);
        this.nextSchedule$.set({ date, schedule });
        return;
      }
    }
    this.nextSchedule$.set(null);
  }

  private initSubscriptions(): void {
    this.timeService.dateChange$.subscribe(() => {
      this.setTodaysSchedule();
      this.setNextSchedule();
    });

    if (
      this.todaysSchedule$()?.schedule?.scheduleHasLunch === true &&
      !!this.todaysSchedule$()?.schedule?.lunchBlackoutTimes
    ) {
      this.timeService.currentDateTime$.subscribe((now: Date) => {
        this.calculateAndSetLunchActive(now);
      });
    }
  }

  private calculateAndSetLunchActive(now: Date): void {
    const timeMs = now.getTime();
    this.areLunchesActive$.set(
      TimeUtil.isTimeBetweenInclusive(
        timeMs,
        this.todaysSchedule$()!.schedule!.lunchBlackoutTimes!
          .aLunchBlackoutStartMs,
        this.todaysSchedule$()!.schedule!.lunchBlackoutTimes!
          .aLunchBlackoutEndMs
      ) ||
        TimeUtil.isTimeBetweenInclusive(
          timeMs,
          this.todaysSchedule$()!.schedule!.lunchBlackoutTimes!
            .bLunchBlackoutStartMs,
          this.todaysSchedule$()!.schedule!.lunchBlackoutTimes!
            .bLunchBlackoutEndMs
        )
    );
  }

  private printNext30DaysToConsole(): void {
    if (!this.localStorageService.isDevModeEnabled) return;
    for (let i = 0; i < 30; i++) {
      let date = new Date();
      date = TimeUtil.addMinutes(date, i * 60 * 24);
      const scheduleType: ScheduleTypeEnum = this.getScheduleTypeForDate(date);
      const schedule = new DailySchedule(scheduleType);
      console.log(date, schedule.scheduleDescription);
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
