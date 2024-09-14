import { NumberUtil } from './NumberUtil';

export abstract class DateUtil {
  private static readonly _weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  private static readonly _months = [
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

  public static generateRandomDateTime(): Date {
    const year = NumberUtil.getRandomIntegerBetweenTwoNumbers(2024, 2026);
    const month = NumberUtil.getRandomIntegerBetweenTwoNumbers(0, 11);
    const day = NumberUtil.getRandomIntegerBetweenTwoNumbers(1, 28);
    const hour = NumberUtil.getRandomIntegerBetweenTwoNumbers(0, 23);
    const minute = NumberUtil.getRandomIntegerBetweenTwoNumbers(0, 59);
    const seconds = NumberUtil.getRandomIntegerBetweenTwoNumbers(0, 59);
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

  public static getNumberOfDaysBetweenDates(
    startDate: Date,
    endDate: Date
  ): number {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    if (startDate >= endDate) {
      return 0; // The end date is actually before the start date
    }

    return Math.floor((endDateMs - startDateMs) / (1000 * 60 * 60 * 24));
  }

  private static getDayOfMonthDisplay(date: Date): string {
    return date.getDate().toString();
  }

  private static getDayOfWeekDisplay(date: Date): string {
    return this._weekdays[date.getDay()];
  }

  private static getMonthDisplay(date: Date): string {
    return this._months[date.getMonth()];
  }
}
