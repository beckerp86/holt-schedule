import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DateUtil } from '../../utils/DateUtil';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private scheduleService = inject(ScheduleService);
  private timeService = inject(TimeService);

  public footerContent: string[] = [];

  constructor() {
    this.timeService.dateChange$.subscribe(() => {
      if (this.scheduleService.nextSchedule$() === null) {
        this.footerContent = ['SUMMER BREAK', 'SUMMER BREAK', 'SUMMER BREAK'];
        return;
      }
      const daysBetween = DateUtil.getNumberOfDaysBetweenDates(
        new Date(),
        this.scheduleService.nextSchedule$()!.date
      );
      this.footerContent = [
        `Next school day is ${
          daysBetween === 1 ? 'tomorrow' : `in ${daysBetween} days`
        }`,
        `on ${DateUtil.getDateDisplayStringForDate(
          this.scheduleService.nextSchedule$()!.date
        )}`,
        `Schedule Type:   ${
          this.scheduleService.nextSchedule$()!.schedule.scheduleDescription
        }`,
      ];
    });
  }
}
