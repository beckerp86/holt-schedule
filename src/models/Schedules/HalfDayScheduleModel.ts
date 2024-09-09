import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class HalfDaySchedule extends ScheduleModel {
  constructor(halfDayType: ScheduleTypeEnum) {
    super(halfDayType);
    this.setActivitiesForType(this.getActivitiesForType(halfDayType));
  }

  private getActivitiesForType(halfDayType: ScheduleTypeEnum): Activity[] {
    switch (halfDayType) {
      case ScheduleTypeEnum.HalfDay1And2:
        return [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 105, 2),
          new Activity(ActivityTypeEnum.Transition, 9, 15, 10),
          new Activity(ActivityTypeEnum.SecondHour, 9, 25, 105, 2),
        ];
      case ScheduleTypeEnum.HalfDay3And4:
        return [
          new Activity(ActivityTypeEnum.ThirdHour, 7, 30, 105, 2),
          new Activity(ActivityTypeEnum.Transition, 9, 15, 10),
          new Activity(ActivityTypeEnum.FourthHour, 9, 25, 105, 2),
        ];
      case ScheduleTypeEnum.HalfDay5And6:
        return [
          new Activity(ActivityTypeEnum.FifthHour, 7, 30, 105, 2),
          new Activity(ActivityTypeEnum.Transition, 9, 15, 10),
          new Activity(ActivityTypeEnum.SixthHour, 9, 25, 105, 2),
        ];
      case ScheduleTypeEnum.HalfDay1Through3:
        return [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 70, 2),
          new Activity(ActivityTypeEnum.Transition, 8, 40, 5),
          new Activity(ActivityTypeEnum.SecondHour, 8, 45, 70, 2),
          new Activity(ActivityTypeEnum.Transition, 9, 55, 5),
          new Activity(ActivityTypeEnum.ThirdHour, 10, 0, 70, 2),
        ];
      case ScheduleTypeEnum.HalfDay4Through6:
        return [
          new Activity(ActivityTypeEnum.FourthHour, 7, 30, 70, 2),
          new Activity(ActivityTypeEnum.Transition, 8, 40, 5),
          new Activity(ActivityTypeEnum.FifthHour, 8, 45, 70, 2),
          new Activity(ActivityTypeEnum.Transition, 9, 55, 5),
          new Activity(ActivityTypeEnum.SixthHour, 10, 0, 70, 2),
        ];
      default:
        throw new Error('Invalid half day type');
    }
  }
}
