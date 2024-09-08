import { ScheduleModel } from './Schedules/ScheduleModel';
import { ScheduleTypeEnum } from './ScheduleTypeEnum';

export class ScheduleType {
  public readonly schedule?: ScheduleModel; // TODO: populate this classmember
  protected readonly typeEnum: ScheduleTypeEnum;
  private readonly _overrideReason: string | undefined;

  constructor(
    typeEnum: ScheduleTypeEnum,
    overrideReason: string | undefined = undefined
  ) {
    this.typeEnum = typeEnum;
    this._overrideReason = overrideReason;
  }

  get typeDescription(): string {
    switch (this.typeEnum) {
      case ScheduleTypeEnum.NoSchool:
        return this.getTypeDescriptionWithOverrideReason('No School');
      case ScheduleTypeEnum.HalfDay1And2:
        return this.getTypeDescriptionWithOverrideReason(
          'Half Day (Exams: 1st & 2nd Hour)'
        );
      case ScheduleTypeEnum.HalfDay3And4:
        return this.getTypeDescriptionWithOverrideReason(
          'Half Day (Exams: 3rd & 4th Hour)'
        );
      case ScheduleTypeEnum.HalfDay5And6:
        return this.getTypeDescriptionWithOverrideReason(
          'Half Day (Exams: 5th & 6th Hour)'
        );
      case ScheduleTypeEnum.HalfDay1Through3:
        return this.getTypeDescriptionWithOverrideReason('Half Day, hours 1-3');
      case ScheduleTypeEnum.HalfDay4Through6:
        return this.getTypeDescriptionWithOverrideReason('Half Day, hours 4-6');
      case ScheduleTypeEnum.EarlyRelease:
        return this.getTypeDescriptionWithOverrideReason('Early Release');
      case ScheduleTypeEnum.RamTime:
        return this.getTypeDescriptionWithOverrideReason('Ram Time');
      case ScheduleTypeEnum.PepRally:
        return this.getTypeDescriptionWithOverrideReason('Pep Rally');
      case ScheduleTypeEnum.Standard:
        return this.getTypeDescriptionWithOverrideReason('Standard');
    }
  }

  private getTypeDescriptionWithOverrideReason(
    typeDescription: string
  ): string {
    return !this._overrideReason
      ? typeDescription
      : `${typeDescription} | (${this._overrideReason})`;
  }
}
