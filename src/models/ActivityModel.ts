export class Activity {
  private _type: ActivityTypeEnum;
  private _startHour: number;
  private _startMinute: number;
  private _durationMinutes: number;
  private _warnWhenMinutesRemain: number;
  private _startDate: Date;

  get startDate(): Date {
    return this._startDate;
  }

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
}
