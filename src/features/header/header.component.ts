import Swal, { SweetAlertResult } from 'sweetalert2';
import { AfterViewInit, Component, inject } from '@angular/core';
import { AudioService } from '../../sevices/audio.service';
import { CommonModule } from '@angular/common';
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
export class HeaderComponent implements AfterViewInit {
  constructor() {}
  private audioService = inject(AudioService);
  public localStorageService = inject(LocalStorageService);

  public timeService = inject(TimeService);
  public scheduleService = inject(ScheduleService);

  get isAudioEnabled(): boolean {
    return this.audioService.isAudioEnabled;
  }

  ngAfterViewInit(): void {
    Swal.fire({
      title: 'Enable Audio Alerts?',
      text: 'Would you like to hear audio alerts when there is 2 minutes remaining in the hour?',
      icon: 'question',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Yup!',
      showDenyButton: true,
      denyButtonText: 'Nope!',
    }).then((result: SweetAlertResult) => {
      this.handleUserPreferencesForAudio(result.isConfirmed);
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Audio Enabled!',
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: 'Audio Disabled!',
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
      }
    });
  }
  public toggleAudio(): void {
    this.audioService.toggleAudio();
  }

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

  public handleUserPreferencesForAudio(audioEnabled: boolean): void {
    if ((!this.isAudioEnabled && audioEnabled) || (this.isAudioEnabled && !audioEnabled)) {
      this.toggleAudio();
    }
  }
}
