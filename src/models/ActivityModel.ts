import { TimeUtil } from '../utils/TimeUtil';
import { ScheduleModel } from './Schedules/ScheduleModel';

export class Activity {
  private readonly _minuteAllowanceToLeaveClass: number = 10;
  private _isInstructionalTime = false;
  private _canLeaveClassStart: Date | undefined = undefined;
  private _canLeaveClassEnd: Date | undefined = undefined;

  readonly type: ActivityTypeEnum;
  readonly startHour: number;
  readonly startMinute: number;
  readonly durationMinutes: number;
  readonly warnWhenMinutesRemain: number;
  readonly startDate: Date;
  readonly endDate: Date;

  public parentSchedule?: ScheduleModel;

  get isInstructionalTime(): boolean {
    return this._isInstructionalTime;
  }

  get willStudentsBeAbleToLeave(): boolean {
    return (
      this.isInstructionalTime &&
      !!this._canLeaveClassStart &&
      !!this._canLeaveClassEnd
    );
  }

  get canLeaveClassStart(): Date | undefined {
    return this._canLeaveClassStart;
  }

  get canLeaveClassEnd(): Date | undefined {
    return this._canLeaveClassEnd;
  }

  constructor(
    typeEnum: ActivityTypeEnum,
    startHour: number,
    startMinute: number,
    durationMinutes: number,
    warnWhenMinutesRemain = 0
  ) {
    this.type = typeEnum;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.durationMinutes = durationMinutes;
    this.warnWhenMinutesRemain = warnWhenMinutesRemain;

    const startDate = new Date();
    this.startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startHour,
      startMinute,
      0,
      0
    );
    this.endDate = TimeUtil.addMinutes(this.startDate, durationMinutes);
    this.setInstructionalTime();
    this.setAllowedRangeToLeaveClass();
  }

  get typeDescription(): string {
    switch (this.type) {
      case ActivityTypeEnum.FirstHour:
        return '1st Hour';
      case ActivityTypeEnum.SecondHour:
        return '2nd Hour';
      case ActivityTypeEnum.ThirdHour:
        return '3rd Hour';
      case ActivityTypeEnum.FourthHour:
        return '4th Hour';
      case ActivityTypeEnum.FifthHour:
        return '5th Hour';
      case ActivityTypeEnum.SixthHour:
        return '6th Hour';
      case ActivityTypeEnum.ALunch:
        return 'A Lunch';
      case ActivityTypeEnum.ALunchTransition:
        return 'A Lunch Transition';
      case ActivityTypeEnum.ALunchClass:
        return 'A Lunch Class';
      case ActivityTypeEnum.BLunch:
        return 'B Lunch';
      case ActivityTypeEnum.BLunchTransition:
        return 'B Lunch Transition';
      case ActivityTypeEnum.BLunchClass:
        return 'B Lunch Class';
      case ActivityTypeEnum.Transition:
        return 'Transition';
      case ActivityTypeEnum.PepRally:
        return 'Pep Rally';
      case ActivityTypeEnum.RamTime:
        return 'Ram Time';
      case ActivityTypeEnum.PD:
        return 'PD';
      case ActivityTypeEnum.PTC_Lunch:
        return 'Lunch Break';
      case ActivityTypeEnum.PTC_Conferences:
        return 'Conferences';
      case ActivityTypeEnum.MorningPrep:
        return 'Morning Prep';
    }
  }

  private setAllowedRangeToLeaveClass(): void {
    if (!this.isInstructionalTime) {
      return;
    }

    this._canLeaveClassStart = TimeUtil.addMinutes(
      this.startDate,
      this._minuteAllowanceToLeaveClass
    );
    this._canLeaveClassEnd = TimeUtil.addMinutes(
      this.endDate,
      -this._minuteAllowanceToLeaveClass
    );
  }

  private setInstructionalTime(): void {
    switch (this.type) {
      case ActivityTypeEnum.FirstHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.SecondHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.ThirdHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.FourthHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.FifthHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.SixthHour:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.ALunchClass:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.BLunchClass:
        this._isInstructionalTime = true;
        break;
      case ActivityTypeEnum.RamTime:
        this._isInstructionalTime = true;
        break;
      default:
        this._isInstructionalTime = false;
        break;
    }
  }
}

export enum ActivityTypeEnum {
  FirstHour = 1,
  SecondHour,
  ThirdHour,
  FourthHour,
  FifthHour,
  SixthHour,
  ALunch,
  ALunchTransition,
  ALunchClass,
  BLunch,
  BLunchTransition,
  BLunchClass,
  Transition,
  PepRally,
  RamTime,
  PD,
  PTC_Lunch,
  PTC_Conferences,
  MorningPrep,
}
