import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { EnvironmentService } from '../sevices/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private environmentService = inject(EnvironmentService);
  private _isAudioEnabledByUser = false;

  get isAudioEnabled(): boolean {
    return this._isAudioEnabledByUser;
  }

  public toggleAudio(): void {
    this._isAudioEnabledByUser = !this._isAudioEnabledByUser;
  }

  public playMp3(audioFileEnum: AudioFileEnum): void {
    if (!this.isAudioEnabled) return;
    new Audio(`${this.environmentService.assetsPath}/${audioFileEnum.toString()}.mp3`).play();
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
