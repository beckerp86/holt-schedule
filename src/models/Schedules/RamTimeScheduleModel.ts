import { Schedule } from './ScheduleModel';
import { ScheduleTypeEnum } from '../ScheduleType';

export class RamTimeSchedule extends Schedule {
  modifiedHourDuration = 56;

  override readonly type = ScheduleTypeEnum.RamTime;

  override readonly firstHourStartTime = '07:30';
  override readonly firstHourDurationMinutes = this.modifiedHourDuration;

  override readonly secondHourStartTime = '08:31';
  override readonly secondHourDurationMinutes = this.modifiedHourDuration;

  override readonly ramtimeStartTime = '09:32';
  override readonly ramtimeDurationMinutes = this.standardRamtimeDuration;

  override readonly thirdHourStartTime = '10:02';
  override readonly thirdHourDurationMinutes = this.modifiedHourDuration;

  override readonly fourthHourStartTime = '11:03';
  override readonly fourthHourDurationMinutes = this.modifiedHourDuration;

  override readonly aLunchStartTime = '10:58';
  override readonly aLunchDurationMinutes = 35;

  override readonly bLunchStartTime = '11:59';
  override readonly bLunchDurationMinutes = this.standardLunchDuration;

  override readonly fifthHourStartTime = '12:34';
  override readonly fifthHourDurationMinutes = this.modifiedHourDuration;

  override readonly sixthHourStartTime = '13:35';
  override readonly sixthHourDurationMinutes = 60;
}
