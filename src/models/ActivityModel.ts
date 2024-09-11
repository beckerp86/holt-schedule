import { TimeUtil } from '../utils/TimeUtil';

export class Activity {
  private readonly _type: ActivityTypeEnum;
  readonly _startHour: number;
  readonly _startMinute: number;
  readonly _durationMinutes: number;
  readonly _warnWhenMinutesRemain: number;
  readonly _startDate: Date;
  readonly _endDate: Date;

  constructor(
    typeEnum: ActivityTypeEnum,
    startHour: number,
    startMinute: number,
    durationMinutes: number,
    warnWhenMinutesRemain: number = 0
  ) {
    this._type = typeEnum;
    this._startHour = startHour;
    this._startMinute = startMinute;
    this._durationMinutes = durationMinutes;
    this._warnWhenMinutesRemain = warnWhenMinutesRemain;

    const startDate = new Date();
    this._startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startHour,
      startMinute
    );
    this._endDate = TimeUtil.getEndDateForDuration(this._startDate, durationMinutes);
  }

  get typeDescription(): string {
    switch (this._type) {
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
      case ActivityTypeEnum.MorningPlanning:
        return 'Morning Planning';
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
  MorningPlanning,
}
