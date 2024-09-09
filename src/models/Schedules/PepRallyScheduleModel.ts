import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class PepRallySchedule extends ScheduleModel {
  constructor() {
    super(ScheduleTypeEnum.PepRally);
    
    this.setActivitiesForType([
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 53, 2),
      new Activity(ActivityTypeEnum.Transition, 8, 23, 5),
      new Activity(ActivityTypeEnum.SecondHour, 8, 28, 53, 2),
      new Activity(ActivityTypeEnum.Transition, 9, 21, 10),
      new Activity(ActivityTypeEnum.ThirdHour, 9, 31, 53, 2),
      new Activity(ActivityTypeEnum.Transition, 10, 24, 5),

      // A Lunch
      new Activity(ActivityTypeEnum.ALunch, 10, 29, 25),
      new Activity(ActivityTypeEnum.ALunchTransition, 10, 54, 5),
      new Activity(ActivityTypeEnum.ALunchClass, 10, 59, 53, 2),

      // B Lunch
      new Activity(ActivityTypeEnum.BLunchClass, 10, 29, 53, 2),
      new Activity(ActivityTypeEnum.BLunchTransition, 11, 22, 5),
      new Activity(ActivityTypeEnum.BLunch, 11, 27, 25),

      new Activity(ActivityTypeEnum.Transition, 11, 52, 5),
      new Activity(ActivityTypeEnum.FifthHour, 11, 57, 53, 2),
      new Activity(ActivityTypeEnum.Transition, 12, 50, 5),
      new Activity(ActivityTypeEnum.SixthHour, 12, 55, 53, 2),
      new Activity(ActivityTypeEnum.Transition, 13, 48, 12),
      new Activity(ActivityTypeEnum.PepRally, 14, 0, 35),
    ]);
  }
}
