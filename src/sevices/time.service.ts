import { Injectable } from '@angular/core';
import { BehaviorSubject, of, pairwise, repeat } from 'rxjs';
import { DateUtil } from '../utils/DateUtil';
import { TimeUtil } from '../utils/TimeUtil';

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
      if (TimeUtil.isMinuteChanged(prev, next)) {
        this.setNewTimeDisplay(next); // Minute changed, we need to update the display
        if (DateUtil.isDateChanged(prev, next)) {
          this.setNewDateDisplay(next); // Date changed, we need to update the display
        }
      }
    });
  }

  private setNewDateDisplay(date: Date): void {
    const newDateDisplay = DateUtil.getDateDisplayStringForDate(date);
    this._currentDateDisplaySubject.next(newDateDisplay);
  }

  private setNewTimeDisplay(date: Date): void {
    const timeDisplay = TimeUtil.getTimeDisplayStringForDate(date);

    this._currentTimeDisplaySubject.next(timeDisplay);
  }
}
