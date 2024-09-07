export class ScheduleType {
  private _type: ScheduleTypeEnum;
  constructor(typeEnum: ScheduleTypeEnum) {
    this._type = typeEnum;
  }

  get typeDescription(): string {
    switch (this._type) {
      case ScheduleTypeEnum.NoSchool:
        return 'No School';
      case ScheduleTypeEnum.HalfDay1And2:
        return 'Half Day (Exams: 1st & 2nd Hour)';
      case ScheduleTypeEnum.HalfDay3And4:
        return 'Half Day (Exams: 3rd & 4th Hour)';
      case ScheduleTypeEnum.HalfDay5And6:
        return 'Half Day (Exams: 5th & 6th Hour)';
      case ScheduleTypeEnum.HalfDay1Through3:
        return 'Half Day, hours 1-3';
      case ScheduleTypeEnum.HalfDay4Through6:
        return 'Half Day, hours 4-6';
      case ScheduleTypeEnum.EarlyRelease:
        return 'Early Release';
      case ScheduleTypeEnum.RamTime:
        return 'Ram Time';
      case ScheduleTypeEnum.PepRally:
        return 'Pep Rally';
      case ScheduleTypeEnum.Standard:
        return 'Standard';
    }
  }
}

export enum ScheduleTypeEnum {
  NoSchool = 0,
  EarlyRelease,
  HalfDay1And2,
  HalfDay1Through3,
  HalfDay3And4,
  HalfDay4Through6,
  HalfDay5And6,
  PepRally,
  RamTime,
  Standard,
}
