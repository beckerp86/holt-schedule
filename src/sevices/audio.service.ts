import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { EnvironmentService } from '../sevices/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private environmentService = inject(EnvironmentService);

  public playMp3(audioFileEnum: AudioFileEnum): void {
    new Audio(`${this.environmentService.assetsPath}/${audioFileEnum.toString()}.mp3`).play();
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
