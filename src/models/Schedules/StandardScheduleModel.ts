import { Schedule } from './ScheduleModel';
import { ScheduleTypeEnum } from '../ScheduleType';

export class StandardSchedule extends Schedule {
  override readonly type = ScheduleTypeEnum.Standard;

  override readonly firstHourStartTime = '07:30';
  override readonly firstHourDurationMinutes = this.standardHourDuration;

  override readonly secondHourStartTime = '08:36';
  override readonly secondHourDurationMinutes = 65;

  override readonly thirdHourStartTime = '09:46';
  override readonly thirdHourDurationMinutes = this.standardHourDuration;

  override readonly fourthHourStartTime = '10:52';
  override readonly fourthHourDurationMinutes = this.standardHourDuration;

  override readonly aLunchStartTime = '10:52';
  override readonly aLunchDurationMinutes = this.standardLunchDuration;

  override readonly bLunchStartTime = '11:58';
  override readonly bLunchDurationMinutes = this.standardLunchDuration;

  override readonly ramtimeStartTime = undefined;
  override readonly ramtimeDurationMinutes = undefined;

  override readonly fifthHourStartTime = '12:28';
  override readonly fifthHourDurationMinutes = this.standardHourDuration;

  override readonly sixthHourStartTime = '13:34';
  override readonly sixthHourDurationMinutes = this.standardHourDuration;
}
