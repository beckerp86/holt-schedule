import { AudioService } from '../../sevices/audio.service';
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
  private audioService = inject(AudioService);

  get isAudioEnabled(): boolean {
    return this.audioService.isAudioEnabled;
  }

  public toggleAudio(): void {
    this.audioService.toggleAudio();
  }
}
