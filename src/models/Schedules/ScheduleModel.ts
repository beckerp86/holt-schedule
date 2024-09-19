import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';

export abstract class ScheduleModel {
  private readonly _baseActivities: Activity[] = [
    new Activity(ActivityTypeEnum.MorningPrep, 7, 0, 30, 7),
  ];
  private _activities: Activity[] = [];
  private _scheduleHasLunch = true;
  private _blackoutTimes: IBlackoutTimes | undefined = undefined;
  public readonly type: ScheduleTypeEnum;

  get scheduleHasLunch(): boolean {
    return this._scheduleHasLunch;
  }

  get lunchBlackoutTimes(): IBlackoutTimes | undefined {
    return this._blackoutTimes;
  }

  get activities(): Activity[] {
    return [...this._baseActivities, ...this._activities];
  }

  constructor(type: ScheduleTypeEnum) {
    this.type = type;
  }

  public setActivitiesForType(activities: Activity[]) {
    this._activities = activities;
    this._scheduleHasLunch = this._activities.some(
      (x: Activity) => x.type === ActivityTypeEnum.ALunch
    );
    this.setLunchBlackoutTime();
  }

  private setLunchBlackoutTime(): void {
    if (!this._scheduleHasLunch) return;
    this._blackoutTimes = {
      aLunchBlackoutStartMs: this._activities
        .find((x: Activity) => x.type === ActivityTypeEnum.ALunch)!
        .startDate.getTime(),
      aLunchBlackoutEndMs: this._activities
        .find((x: Activity) => x.type === ActivityTypeEnum.ALunchClass)!
        .startDate.getTime(),
      bLunchBlackoutStartMs: this._activities
        .find((x: Activity) => x.type === ActivityTypeEnum.BLunchClass)!
        .endDate.getTime(),
      bLunchBlackoutEndMs: this._activities
        .find((x: Activity) => x.type === ActivityTypeEnum.BLunch)!
        .endDate.getTime(),
    };
  }
}

export interface IBlackoutTimes {
  aLunchBlackoutStartMs: number;
  aLunchBlackoutEndMs: number;
  bLunchBlackoutStartMs: number;
  bLunchBlackoutEndMs: number;
}
