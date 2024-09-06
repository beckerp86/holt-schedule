import { Injectable } from '@angular/core';
import { BehaviorSubject, of, pairwise, repeat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private _currentTimeDisplaySubject = new BehaviorSubject<string>('');
  public currentTimeDisplay$ = this._currentTimeDisplaySubject.asObservable();

  private _currentDateDisplaySubject = new BehaviorSubject<string>('');
  public currentDateDisplay$ = this._currentDateDisplaySubject.asObservable();

  private _currentDateSubject = new BehaviorSubject<Date>(new Date());
  public currentDate$ = this._currentDateSubject.asObservable();

  constructor() {
    const constructionDate = new Date();
    this._currentDateSubject.next(constructionDate);
    this.setNewTimeDisplay(constructionDate);
    this.setNewDateDisplay(constructionDate);

    // Every second, update the Date observable
    of(null)
      .pipe(repeat({ delay: 1000 }))
      .subscribe(() => {
        this._currentDateSubject.next(new Date());
      });

    // When the date observable changes, we may need to update the Date or Time display
    this.currentDate$.pipe(pairwise()).subscribe(([prev, next]: Date[]) => {
      if (TimeService.isMinuteChanged(prev, next)) {
        this.setNewTimeDisplay(next); // Minute changed, we need to update the display
        if (TimeService.isDateChanged(prev, next)) {
          this.setNewDateDisplay(next); // Date changed, we need to update the display
        }
      }
    });
  }

  public generateRandomDateTime(): Date {
    const year = TimeService.randomFromInterval(2024, 2026);
    const month = TimeService.randomFromInterval(0, 11);
    const day = TimeService.randomFromInterval(1, 28);
    const hour = TimeService.randomFromInterval(0, 23);
    const minute = TimeService.randomFromInterval(0, 59);
    const seconds = TimeService.randomFromInterval(0, 59);
    return new Date(year, month, day, hour, minute, seconds);
  }

  public getTimerDisplayBetweenTwoDates(
    startDate: Date,
    endDate: Date
  ): string {
    return TimeService.getTimerDisplay(
      TimeService.getDurationBetweenDates(startDate, endDate)
    );
  }

  private setNewDateDisplay(date: Date): void {
    const dayOfWeek = TimeService.getDayOfWeekDisplay(date);
    const month = TimeService.getMonthDisplay(date);
    const dayOfMonth = TimeService.getDayOfMonthDisplay(date);
    const ordinalForMonth = TimeService.getOrdinalForMonthDisplay(date);
    const newDateDisplay = `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalForMonth}`;
    this._currentDateDisplaySubject.next(newDateDisplay);
  }

  private setNewTimeDisplay(date: Date): void {
    const hours = date.getHours();
    const amPmHours = TimeService.getAmPmHours(hours);
    const minutes = date.getMinutes();

    this._currentTimeDisplaySubject.next(
      `${TimeService.getHoursDisplay(
        amPmHours
      )}:${TimeService.getMinutesDisplay(minutes)} ${TimeService.getAmPmDisplay(
        hours
      )}`
    );
  }

  private static getAmPmHours(amPmHours: number): number {
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

  private static getDayOfMonthDisplay(date: Date): string {
    return date.getDate().toString();
  }

  private static getOrdinalForMonthDisplay(date: Date): string {
    // deal with special cases for 11, 12, and 13
    const dayOfMonth = TimeService.getDayOfMonthDisplay(date);
    if (dayOfMonth === '11' || dayOfMonth === '12' || dayOfMonth === '13') {
      return 'th';
    }

    const lastChar = dayOfMonth.slice(-1);
    switch (lastChar) {
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default:
        return 'th';
    }
  }

  private static isDateChanged(prev: Date, next: Date): boolean {
    return prev.getDate() !== next.getDate();
  }

  private static isMinuteChanged(prev: Date, next: Date): boolean {
    return prev.getMinutes() !== next.getMinutes();
  }

  private static getDurationBetweenDates(start: Date, end: Date): TimeDuration {
    let msBetween = end.getTime() - start.getTime();

    // Subtract full minutes
    const minutes = Math.floor(msBetween / (1000 * 60));
    if (minutes > 0) {
      msBetween -= minutes * 1000 * 60;
    }

    // Subtract full seconds
    const seconds = Math.floor(msBetween / 1000);

    return new TimeDuration(minutes, seconds);
  }

  private static getTimerDisplay(duration: TimeDuration): string {
    const minutesDisplay = duration.minutes.toString().padStart(2, '0');
    const secondsDisplay = duration.seconds.toString().padStart(2, '0');

    return `${minutesDisplay}:${secondsDisplay}`;
  }

  private static randomFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class TimeDuration {
  public minutes: number = 0;
  public seconds: number = 0;
  constructor(minutes: number, seconds: number) {
    this.minutes = minutes;
    this.seconds = seconds;
  }
}
