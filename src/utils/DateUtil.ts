import { NumberUtil } from './NumberUtil';

export abstract class DateUtil {
  public static generateRandomDateTime(): Date {
    const year = NumberUtil.randomFromInterval(2024, 2026);
    const month = NumberUtil.randomFromInterval(0, 11);
    const day = NumberUtil.randomFromInterval(1, 28);
    const hour = NumberUtil.randomFromInterval(0, 23);
    const minute = NumberUtil.randomFromInterval(0, 59);
    const seconds = NumberUtil.randomFromInterval(0, 59);
    return new Date(year, month, day, hour, minute, seconds);
  }

  public static isDateChanged(prev: Date, next: Date): boolean {
    return prev.getDate() !== next.getDate();
  }

  public static getDateDisplayStringForDate(date: Date): string {
    const dayOfWeek = DateUtil.getDayOfWeekDisplay(date);
    const month = DateUtil.getMonthDisplay(date);
    const dayOfMonth = DateUtil.getDayOfMonthDisplay(date);
    const ordinalForMonth = NumberUtil.getOrdinalSuffix(date.getDate());
    const dateDisplay = `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalForMonth}`;
    return dateDisplay;
  }

  private static getDayOfMonthDisplay(date: Date): string {
    return date.getDate().toString();
  }

  private static getDayOfWeekDisplay(date: Date): string {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeekIndex: number = date.getDay();
    return weekdays[dayOfWeekIndex];
  }

  private static getMonthDisplay(date: Date): string {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex: number = date.getMonth();
    return month[monthIndex];
  }
}
