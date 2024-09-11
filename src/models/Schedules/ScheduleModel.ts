import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';

export abstract class ScheduleModel {
  private _activities: Activity[] = [];
  private readonly _baseActivities: Activity[] = [new Activity(ActivityTypeEnum.MorningPlanning, 7, 0, 30, 7)];
  public readonly type: ScheduleTypeEnum;

  get activities(): Activity[] {
    return [...this._baseActivities, ...this._activities];
  }

  constructor(type: ScheduleTypeEnum) {
    this.type = type;
  }

  public setActivitiesForType(activities: Activity[]) {
    this._activities = activities;
  }
}
