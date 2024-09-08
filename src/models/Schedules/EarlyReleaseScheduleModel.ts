import { Activity, ActivityTypeEnum } from '../ActivityModel';

export class EarlyReleaseSchedule {
  public activities: Activity[];
  constructor() {
    this.activities = [
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
      new Activity(ActivityTypeEnum.Transition, 8, 12, 5),
      new Activity(ActivityTypeEnum.SecondHour, 8, 17, 41, 2),
      new Activity(ActivityTypeEnum.Transition, 8, 58, 5),
      new Activity(ActivityTypeEnum.ThirdHour, 9, 3, 41, 2),
      new Activity(ActivityTypeEnum.Transition, 9, 44, 5),
      new Activity(ActivityTypeEnum.FourthHour, 9, 49, 41, 2),
      new Activity(ActivityTypeEnum.Transition, 10, 30, 5),

      // A Lunch
      new Activity(ActivityTypeEnum.ALunch, 10, 35, 25),
      new Activity(ActivityTypeEnum.ALunchTransition, 11, 0, 5),
      new Activity(ActivityTypeEnum.ALunchClass, 11, 5, 41, 2),

      // B Lunch
      new Activity(ActivityTypeEnum.BLunchClass, 10, 35, 41, 2),
      new Activity(ActivityTypeEnum.BLunchTransition, 11, 16, 5),
      new Activity(ActivityTypeEnum.BLunch, 11, 21, 25),

      new Activity(ActivityTypeEnum.Transition, 11, 46, 5),
      new Activity(ActivityTypeEnum.SixthHour, 11, 51, 41, 2),
    ];
  }
}
