import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScheduleOverrideService } from '../sevices/schedule-override.service';
import { TimeService } from '../sevices/time.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public timeService = inject(TimeService);
  public scheduleOverrideService = inject(ScheduleOverrideService);
}
