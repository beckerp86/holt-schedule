import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class RamTimeSchedule extends ScheduleModel {
  constructor() {
    super(ScheduleTypeEnum.RamTime);

    this.setActivitiesForType([
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 56, 2),
      new Activity(ActivityTypeEnum.Transition, 8, 26, 5),
      new Activity(ActivityTypeEnum.SecondHour, 8, 31, 56, 2),
      new Activity(ActivityTypeEnum.Transition, 9, 27, 5),
      new Activity(ActivityTypeEnum.RamTime, 9, 32, 25, 2),
      new Activity(ActivityTypeEnum.Transition, 9, 57, 5),
      new Activity(ActivityTypeEnum.ThirdHour, 10, 2, 56, 2),
      new Activity(ActivityTypeEnum.Transition, 10, 58, 5),

      // A Lunch
      new Activity(ActivityTypeEnum.ALunch, 11, 3, 25),
      new Activity(ActivityTypeEnum.ALunchTransition, 11, 28, 5),
      new Activity(ActivityTypeEnum.ALunchClass, 11, 33, 56, 2),

      // B Lunch
      new Activity(ActivityTypeEnum.BLunchClass, 11, 3, 56, 2),
      new Activity(ActivityTypeEnum.BLunchTransition, 11, 59, 5),
      new Activity(ActivityTypeEnum.BLunch, 12, 4, 25),

      new Activity(ActivityTypeEnum.Transition, 12, 29, 5),
      new Activity(ActivityTypeEnum.FifthHour, 12, 34, 56, 2),
      new Activity(ActivityTypeEnum.Transition, 13, 30, 5),
      new Activity(ActivityTypeEnum.SixthHour, 13, 35, 60, 2),
    ]);
  }
}
