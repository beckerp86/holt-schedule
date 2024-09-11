import { EarlyReleaseSchedule } from './Schedules/EarlyReleaseScheduleModel';
import { HalfDaySchedule } from './Schedules/HalfDayScheduleModel';
import { PepRallySchedule } from './Schedules/PepRallyScheduleModel';
import { RamTimeSchedule } from './Schedules/RamTimeScheduleModel';
import { ScheduleModel } from './Schedules/ScheduleModel';
import { ScheduleTypeEnum } from './ScheduleTypeEnum';
import { StandardSchedule } from './Schedules/StandardScheduleModel';

export class DailySchedule {
  public readonly schedule: ScheduleModel | undefined;
  protected readonly typeEnum: ScheduleTypeEnum;
  private readonly _overrideReason: string | undefined;

  constructor(typeEnum: ScheduleTypeEnum, overrideReason: string | undefined = undefined) {
    this.typeEnum = typeEnum;
    this._overrideReason = overrideReason;

    switch (this.typeEnum) {
      case ScheduleTypeEnum.EarlyRelease:
        this.schedule = new EarlyReleaseSchedule();
        break;
      case ScheduleTypeEnum.RamTime:
        this.schedule = new RamTimeSchedule();
        break;
      case ScheduleTypeEnum.Standard:
        this.schedule = new StandardSchedule();
        break;
      case ScheduleTypeEnum.PepRally:
        this.schedule = new PepRallySchedule();
        break;
      case ScheduleTypeEnum.HalfDay1And2:
        this.schedule = new HalfDaySchedule(ScheduleTypeEnum.HalfDay1And2);
        break;
      case ScheduleTypeEnum.HalfDay3And4:
        this.schedule = new HalfDaySchedule(ScheduleTypeEnum.HalfDay3And4);
        break;
      case ScheduleTypeEnum.HalfDay5And6:
        this.schedule = new HalfDaySchedule(ScheduleTypeEnum.HalfDay5And6);
        break;
      case ScheduleTypeEnum.HalfDay1Through3:
        this.schedule = new HalfDaySchedule(ScheduleTypeEnum.HalfDay1Through3);
        break;
      case ScheduleTypeEnum.HalfDay4Through6:
        this.schedule = new HalfDaySchedule(ScheduleTypeEnum.HalfDay4Through6);
        break;
      default:
        this.schedule = undefined;
        break;
    }
  }

  get scheduleDescription(): string {
    switch (this.typeEnum) {
      case ScheduleTypeEnum.NoSchool:
        return this.getTypeDescriptionWithOverrideReason('No School');
      case ScheduleTypeEnum.HalfDay1And2:
        return this.getTypeDescriptionWithOverrideReason('Half Day (Exams: 1st & 2nd Hour)');
      case ScheduleTypeEnum.HalfDay3And4:
        return this.getTypeDescriptionWithOverrideReason('Half Day (Exams: 3rd & 4th Hour)');
      case ScheduleTypeEnum.HalfDay5And6:
        return this.getTypeDescriptionWithOverrideReason('Half Day (Exams: 5th & 6th Hour)');
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

  private getTypeDescriptionWithOverrideReason(typeDescription: string): string {
    return !this._overrideReason ? typeDescription : `${typeDescription} | (${this._overrideReason})`;
  }
}
