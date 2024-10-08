import { AsyncPipe, NgIf } from '@angular/common';
import { AudioService } from '../../sevices/audio.service';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from '../../sevices/local-storage.service';
import { ScheduleService } from '../../sevices/schedule.service';
import { TimeService } from '../../sevices/time.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, AsyncPipe, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private audioService = inject(AudioService);
  public localStorageService = inject(LocalStorageService);

  public timeService = inject(TimeService);
  public scheduleService = inject(ScheduleService);

  public playAudio(): void {
    if (!this.localStorageService.isDevModeEnabled) {
      return;
    }
    this.audioService.playWarningSound();
  }
}
