import { Activity } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';

export abstract class ScheduleModel {
  private _activities: Activity[] = [];
  public readonly type: ScheduleTypeEnum;

  get activities(): Activity[] {
    return this._activities;
  }

  constructor(type: ScheduleTypeEnum) {
    this.type = type;
  }

  public setActivitiesForType(activities: Activity[]) {
    this._activities = activities;
  }
}
