import { BehaviorSubject, of, pairwise, repeat } from 'rxjs';
import { DateUtil } from '../utils/DateUtil';
import { LocalStorageService } from './local-storage.service';
import { TimeUtil } from '../utils/TimeUtil';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private localStorageService = inject(LocalStorageService);
  private _inDevModeWithCustomDate = false;

  private _currentTimeDisplaySubject = new BehaviorSubject<string>('');
  public currentTimeDisplay$ = this._currentTimeDisplaySubject.asObservable();

  private _currentDateDisplaySubject = new BehaviorSubject<string>('');
  public currentDateDisplay$ = this._currentDateDisplaySubject.asObservable();

  private _currentDateTimeSubject = new BehaviorSubject<Date>(new Date());
  public currentDateTime$ = this._currentDateTimeSubject.asObservable();

  private _dateChangeSubject = new BehaviorSubject<Date>(new Date());
  public dateChange$ = this._dateChangeSubject.asObservable();

  constructor() {
    this._inDevModeWithCustomDate =
      this.localStorageService.isDevModeEnabled &&
      this.localStorageService.devModeEmulatedDateTime !== null;
    const date = this._inDevModeWithCustomDate
      ? (this.localStorageService.devModeEmulatedDateTime as Date)
      : new Date();
    this._currentDateTimeSubject.next(date);
    this.setNewTimeDisplay(date);
    this.setNewDateDisplay(date);

    // Every second, update the Date observable
    if (this._inDevModeWithCustomDate) {
      // We are in dev mode, and we want to start adding seconds to the DevMode emulated date.
      of(null)
        .pipe(repeat({ delay: 1000 }))
        .subscribe(() => {
          const localStorageDate = this.localStorageService
            .devModeEmulatedDateTime as Date;
          localStorageDate?.setTime(localStorageDate.getTime() + 1000);
          this.localStorageService.setNewDevModeEmulatedDateTime(
            localStorageDate
          );
          this._currentDateTimeSubject.next(localStorageDate);
        });
    } else {
      // default resolution of current DateTime
      of(null)
        .pipe(repeat({ delay: 1000 }))
        .subscribe(() => {
          this._currentDateTimeSubject.next(new Date());
        });
    }

    // When the date observable changes, we may need to update the Date or Time display
    this.currentDateTime$.pipe(pairwise()).subscribe(([prev, next]: Date[]) => {
      if (TimeUtil.isMinuteChanged(prev, next)) {
        this.setNewTimeDisplay(next); // Minute changed, we need to update the display
        if (DateUtil.isDateChanged(prev, next)) {
          this.setNewDateDisplay(next); // Date changed, we need to update the display
        }
      }
    });
  }

  private setNewDateDisplay(date: Date): void {
    this._dateChangeSubject.next(date);
    const newDateDisplay = DateUtil.getDateDisplayStringForDate(date);
    this._currentDateDisplaySubject.next(newDateDisplay);
  }

  private setNewTimeDisplay(date: Date): void {
    const timeDisplay = TimeUtil.getTimeDisplayStringForDate(date);
    this._currentTimeDisplaySubject.next(timeDisplay);
  }
}
