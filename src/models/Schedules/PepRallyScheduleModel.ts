import { Activity, ActivityTypeEnum } from '../ActivityModel';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';
import { ScheduleModel } from './ScheduleModel';

export class PepRallySchedule extends ScheduleModel {
  constructor() {
    super(ScheduleTypeEnum.PepRally, [
      new Activity(ActivityTypeEnum.FirstHour, 7, 30, 42, 2),
    ]);
  }
}
