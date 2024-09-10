import Swal, { SweetAlertResult } from 'sweetalert2';
import { AfterViewInit, Component, inject } from '@angular/core';
import { AudioService } from '../../sevices/audio.service';
import { CommonModule } from '@angular/common';
import { ScheduleOverrideService } from '../../sevices/schedule-override.service';
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
  public timeService = inject(TimeService);
  public scheduleOverrideService = inject(ScheduleOverrideService);
  private audioService = inject(AudioService);

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
      denyButtonText: 'Nope',
    }).then((result: SweetAlertResult) => {
      this.handleUserPreferencesForAudio(result.isConfirmed);
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Audio Enabled!',
          text: 'LET THE CHIMES BEGIN!',
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: 'Audio Disabled!',
          text: 'NO CHIMES! I HATE CHIMES!',
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

  public handleUserPreferencesForAudio(audioEnabled: boolean): void {
    if ((!this.isAudioEnabled && audioEnabled) || (this.isAudioEnabled && !audioEnabled)) {
      this.toggleAudio();
    }
  }
}
