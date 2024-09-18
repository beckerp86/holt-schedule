import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class PepRallySchedule extends ScheduleModel {
  constructor() {
    super(ScheduleTypeEnum.PepRally);

    this.setActivitiesForType([
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 55, 2),
      new Activity(ActivityTypeEnum.Transition, 8, 25, 5),
      new Activity(ActivityTypeEnum.SecondHour, 8, 30, 55, 2),
      new Activity(ActivityTypeEnum.Transition, 9, 25, 5),
      new Activity(ActivityTypeEnum.ThirdHour, 9, 30, 55, 2),
      new Activity(ActivityTypeEnum.Transition, 10, 25, 5),

      // A Lunch
      new Activity(ActivityTypeEnum.ALunch, 10, 30, 25),
      new Activity(ActivityTypeEnum.ALunchTransition, 10, 55, 5),
      new Activity(ActivityTypeEnum.ALunchClass, 11, 0, 55, 2),

      // B Lunch
      new Activity(ActivityTypeEnum.BLunchClass, 10, 30, 55, 2),
      new Activity(ActivityTypeEnum.BLunchTransition, 11, 25, 5),
      new Activity(ActivityTypeEnum.BLunch, 11, 30, 25),

      new Activity(ActivityTypeEnum.Transition, 11, 55, 5),
      new Activity(ActivityTypeEnum.FifthHour, 12, 0, 55, 2),
      new Activity(ActivityTypeEnum.Transition, 12, 55, 5),
      new Activity(ActivityTypeEnum.SixthHour, 13, 0, 55, 2),
      new Activity(ActivityTypeEnum.PepRally, 13, 55, 35),
    ]);
  }
}
