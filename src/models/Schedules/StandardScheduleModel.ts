import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class EarlyReleaseSchedule extends ScheduleModel {
  override type = ScheduleTypeEnum.EarlyRelease;
  override activities = [
    new Activity(ActivityTypeEnum.FirstHour, 7, 30, 61, 2),
    new Activity(ActivityTypeEnum.Transition, 8, 31, 5),
    new Activity(ActivityTypeEnum.SecondHour, 8, 36, 65, 2),
    new Activity(ActivityTypeEnum.Transition, 9, 41, 5),
    new Activity(ActivityTypeEnum.ThirdHour, 9, 46, 61, 2),
    new Activity(ActivityTypeEnum.Transition, 10, 47, 5),

    // A Lunch
    new Activity(ActivityTypeEnum.ALunch, 10, 52, 25),
    new Activity(ActivityTypeEnum.ALunchTransition, 11, 17, 5),
    new Activity(ActivityTypeEnum.ALunchClass, 11, 22, 61, 2),

    // B Lunch
    new Activity(ActivityTypeEnum.BLunchClass, 10, 52, 61, 2),
    new Activity(ActivityTypeEnum.BLunchTransition, 11, 53, 5),
    new Activity(ActivityTypeEnum.BLunch, 11, 58, 25),

    new Activity(ActivityTypeEnum.Transition, 12, 23, 5),
    new Activity(ActivityTypeEnum.FifthHour, 12, 28, 61, 2),
    new Activity(ActivityTypeEnum.Transition, 13, 29, 5),
    new Activity(ActivityTypeEnum.SixthHour, 13, 34, 61, 2),
  ];
}
