import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DateUtil } from '../../utils/DateUtil';
import { INextSchedule, ScheduleOverrideService } from '../../sevices/schedule-override.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private scheduleOverrideService = inject(ScheduleOverrideService);

  public footerContent: string[] = [];

  constructor() {
    this.scheduleOverrideService.nextSchedule$.subscribe((nextSchedule: INextSchedule | null) => {
      if (nextSchedule === null) {
        this.footerContent = ['SUMMER BREAK', 'SUMMER BREAK', 'SUMMER BREAK'];
        return;
      }
      const daysBetween = DateUtil.getNumberOfDaysBetweenDates(new Date(), nextSchedule.date);
      this.footerContent = [
        `Next school day is in ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'}`,
        `on ${DateUtil.getDateDisplayStringForDate(nextSchedule.date)}`,
        `Schedule Type:   ${nextSchedule.schedule.scheduleDescription}`,
      ];
    });
  }
}
