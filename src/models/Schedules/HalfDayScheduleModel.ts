import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class HalfDaySchedule extends ScheduleModel {
  constructor(halfDayType: ScheduleTypeEnum) {
    let activitiesForType: Activity[];
    switch (halfDayType) {
      case ScheduleTypeEnum.HalfDay1And2:
        activitiesForType = [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
        ];
        break;
      case ScheduleTypeEnum.HalfDay3And4:
        activitiesForType = [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
        ];
        break;
      case ScheduleTypeEnum.HalfDay5And6:
        activitiesForType = [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
        ];
        break;
      case ScheduleTypeEnum.HalfDay1Through3:
        activitiesForType = [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
        ];
        break;
      case ScheduleTypeEnum.HalfDay4Through6:
        activitiesForType = [
          new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
        ];
        break;
    }
    super(halfDayType, [
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
    ]);
  }
}
