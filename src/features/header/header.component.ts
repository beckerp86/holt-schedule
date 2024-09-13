import { AudioService } from '../../sevices/audio.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../sevices/local-storage.service';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor() {}
  private audioService = inject(AudioService);
  public localStorageService = inject(LocalStorageService);

  public timeService = inject(TimeService);
  public scheduleService = inject(ScheduleService);

  public playAudio(): void {
    if (!this.localStorageService.isDevModeEnabled) {
      return;
    }

    if (Math.random() < 0.5) {
      this.audioService.howlChime();
      return;
    }
    this.audioService.howlSeatbelt();
  }
}
