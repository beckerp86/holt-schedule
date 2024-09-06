import { ScheduleTypeEnum } from '../ScheduleType';

export abstract class Schedule {
  abstract type: ScheduleTypeEnum;

  // Standard Durations
  public standardHourDuration: number = 61;
  public standardLunchDuration: number = 30;
  public standardRamtimeDuration: number = 25;

  // First Hour
  abstract firstHourStartTime: string | undefined;
  abstract firstHourDurationMinutes: number | undefined;

  // Second Hour
  abstract secondHourStartTime: string | undefined;
  abstract secondHourDurationMinutes: number | undefined;

  // Ram Time
  abstract ramtimeStartTime: string | undefined;
  abstract ramtimeDurationMinutes: number | undefined;

  // Third Hour
  abstract thirdHourStartTime: string | undefined;
  abstract thirdHourDurationMinutes: number | undefined;

  // Fourth Hour
  abstract fourthHourStartTime: string | undefined;
  abstract fourthHourDurationMinutes: number | undefined;

  // A-Lunch
  abstract aLunchStartTime: string | undefined;
  abstract aLunchDurationMinutes: number | undefined;

  // B-Lunch
  abstract bLunchStartTime: string | undefined;
  abstract bLunchDurationMinutes: number | undefined;

  // Fifth Hour
  abstract fifthHourStartTime: string | undefined;
  abstract fifthHourDurationMinutes: number | undefined;

  // Sixth Hour
  abstract sixthHourStartTime: string | undefined;
  abstract sixthHourDurationMinutes: number | undefined;

  get bLunchClassStartTime(): string | undefined {
    return this.aLunchStartTime;
  }

  get aLunchClassStartTime(): string | undefined {
    return (this.aLunchStartTime ?? '') + (this.aLunchDurationMinutes ?? '');
  }
}
