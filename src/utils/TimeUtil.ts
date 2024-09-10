import TimeDuration from '../models/TimeDurationModel';

export abstract class TimeUtil {
  public static isBefore(prev: Date, next: Date): boolean {
    return prev.getTime() < next.getTime();
  }

  public static isAfter(prev: Date, next: Date): boolean {
    return prev.getTime() > next.getTime();
  }

  public static isMinuteChanged(prev: Date, next: Date): boolean {
    return prev.getMinutes() !== next.getMinutes();
  }

  public static getTimerDisplayBetweenTwoDates(startDate: Date, endDate: Date): string {
    return TimeUtil.getTimerDisplay(TimeUtil.getDurationBetweenDates(startDate, endDate));
  }

  public static getEndDateForDuration(startDateTime: Date, durationMinutes: number): Date {
    const endDate = new Date(startDateTime);
    endDate.setMinutes(startDateTime.getMinutes() + durationMinutes);
    return endDate;
  }

  public static getTimeDisplayStringForDate(date: Date): string {
    const hours = date.getHours();
    const amPmHours = TimeUtil.getAmPmHours(hours);
    const minutes = date.getMinutes();
    const timeDisplay = `${TimeUtil.getHoursDisplay(amPmHours)}:${TimeUtil.getMinutesDisplay(
      minutes
    )} ${TimeUtil.getAmPmDisplay(hours)}`;
    return timeDisplay;
  }

  public static getDurationBetweenDates(start: Date, end: Date): TimeDuration {
    let msBetween = end.getTime() - start.getTime();
    if (msBetween < 0) {
      return new TimeDuration(0, 0);
    }

    // Subtract full minutes
    const minutes = Math.floor(msBetween / (1000 * 60));
    if (minutes > 0) {
      msBetween -= minutes * 1000 * 60;
    }

    // Subtract full seconds
    const seconds = Math.floor(msBetween / 1000);

    return new TimeDuration(minutes, seconds);
  }

  public static getTimerDisplay(duration: TimeDuration): string {
    const minutesDisplay = duration.minutes.toString().padStart(2, '0');
    const secondsDisplay = duration.seconds.toString().padStart(2, '0');

    return `${minutesDisplay}:${secondsDisplay}`;
  }

  private static getAmPmHours(amPmHours: number): number {
    if (amPmHours === 0) {
      return 12; // deals with midnight
    }

    return amPmHours > 12 ? amPmHours - 12 : amPmHours;
  }

  private static getHoursDisplay(amPmHours: number): string {
    return amPmHours.toString().padStart(2, '0');
  }

  private static getMinutesDisplay(minutes: number): string {
    return minutes.toString().padStart(2, '0');
  }

  private static getAmPmDisplay(amPmHours: number): string {
    return amPmHours >= 12 ? 'PM' : 'AM';
  }
}
