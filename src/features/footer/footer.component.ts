import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DateUtil } from '../../utils/DateUtil';
import { INextSchedule, ScheduleService } from '../../sevices/schedule.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private scheduleService = inject(ScheduleService);

  public footerContent: string[] = [];

  constructor() {
    this.scheduleService.nextSchedule$.subscribe((nextSchedule: INextSchedule | null) => {
      if (nextSchedule === null) {
        this.footerContent = ['SUMMER BREAK', 'SUMMER BREAK', 'SUMMER BREAK'];
        return;
      }
      const daysBetween = DateUtil.getNumberOfDaysBetweenDates(new Date(), nextSchedule.date);
      this.footerContent = [
        `Next school day is ${daysBetween === 1 ? 'tomorrow' : `in ${daysBetween} days`}`,
        `on ${DateUtil.getDateDisplayStringForDate(nextSchedule.date)}`,
        `Schedule Type:   ${nextSchedule.schedule.scheduleDescription}`,
      ];
    });
  }
}
