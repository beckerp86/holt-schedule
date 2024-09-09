import { Activity } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';

export class ScheduleModel {
  public readonly type: ScheduleTypeEnum;
  public readonly activities: Activity[];

  constructor(type: ScheduleTypeEnum, activities: Activity[]) {
    this.type = type;
    this.activities = activities;
  }
}
