import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ScheduleOverrideService } from '../../sevices/schedule-override.service';
import { TimeService } from '../../sevices/time.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public timeService = inject(TimeService);
  public scheduleOverrideService = inject(ScheduleOverrideService);
}
