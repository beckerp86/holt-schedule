import { TimeUtil } from '../utils/TimeUtil';

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
  private _startDate: Date = new Date();
  private _endDate: Date = new Date();

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

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

    this.calculateAndSetDates();
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

  public recalculateDatesForRefDate(refDate: Date): void {
    this.calculateAndSetDates(refDate);
  }

  private calculateAndSetDates(refDate: Date = new Date()): void {
    this._startDate = new Date(
      refDate.getFullYear(),
      refDate.getMonth(),
      refDate.getDate(),
      this.startHour,
      this.startMinute,
      0,
      0
    );
    this._endDate = TimeUtil.addMinutes(this.startDate, this.durationMinutes);

    this.setInstructionalTime();
    this.setAllowedRangeToLeaveClass();
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
      case ActivityTypeEnum.SecondHour:
      case ActivityTypeEnum.ThirdHour:
      case ActivityTypeEnum.FourthHour:
      case ActivityTypeEnum.FifthHour:
      case ActivityTypeEnum.SixthHour:
      case ActivityTypeEnum.ALunchClass:
      case ActivityTypeEnum.BLunchClass:
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
