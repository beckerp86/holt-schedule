export class ScheduleType {
  private _type: ScheduleTypeEnum;
  constructor(typeEnum: ScheduleTypeEnum) {
    this._type = typeEnum;
  }

  get typeDescription(): string {
    switch (this._type) {
      case ScheduleTypeEnum.NoSchool:
        return 'No School';
      case ScheduleTypeEnum.HalfDay1Through3:
        return 'Half Day, hours 1-3';
      case ScheduleTypeEnum.HalfDay4Through6:
        return 'Half Day, hours 4-6';
      case ScheduleTypeEnum.EarlyRelease:
        return 'Early Release';
      case ScheduleTypeEnum.RamTime:
        return 'Ram Time Day';
      case ScheduleTypeEnum.Standard:
        return 'Standard Day';
    }
  }
}

export enum ScheduleTypeEnum {
  NoSchool = 1,
  HalfDay1Through3,
  HalfDay4Through6,
  EarlyRelease,
  RamTime,
  Standard,
}
