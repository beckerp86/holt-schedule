import { Schedule } from './ScheduleModel';
import { ScheduleTypeEnum } from '../ScheduleType';

export class EarlyReleaseSchedule extends Schedule {
  override readonly type = ScheduleTypeEnum.EarlyRelease;

  override readonly firstHourStartTime = '07:30';
  override readonly firstHourDurationMinutes = 42;

  override readonly secondHourStartTime = '08:17';
  override readonly secondHourDurationMinutes = 45;

  override readonly thirdHourStartTime = '09:03';
  override readonly thirdHourDurationMinutes = 41;

  override readonly fourthHourStartTime = '09:49';
  override readonly fourthHourDurationMinutes = 41;

  override readonly aLunchStartTime = '10:58';
  override readonly aLunchDurationMinutes = this.standardLunchDuration;

  override readonly bLunchStartTime = '11:21';
  override readonly bLunchDurationMinutes = this.standardLunchDuration;

  override readonly fifthHourStartTime = '10:35';
  override readonly fifthHourDurationMinutes = 41;

  override readonly sixthHourStartTime = '11:51';
  override readonly sixthHourDurationMinutes = 44;

  override readonly ramtimeStartTime = undefined;
  override readonly ramtimeDurationMinutes = undefined;
}
