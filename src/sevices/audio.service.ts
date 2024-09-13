import { EnvironmentService } from '../sevices/environment.service';
import { Howl } from 'howler';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor() {}

  private environmentService = inject(EnvironmentService);
  private _isAudioEnabledByUser = false;

  get isAudioEnabled(): boolean {
    return this._isAudioEnabledByUser;
  }

  public toggleAudio(): void {
    this._isAudioEnabledByUser = !this._isAudioEnabledByUser;
  }

  public howlSeatbelt(): void {
    this.howl(this.getFilepath(AudioFileEnum.Seatbelt, AudioFileFormat.Mp3));
  }

  public howlChime(): void {
    this.howl(this.getFilepath(AudioFileEnum.Chime, AudioFileFormat.Wav));
  }

  private howl(src: string): void {
    if (!this.isAudioEnabled) return;
    try {
      const sound = new Howl({ src });
      sound.play();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  private getFilepath(audioFileEnum: AudioFileEnum, audioFileFormat: AudioFileFormat): string {
    return `${this.environmentService.assetsPath}/${audioFileEnum.toString()}.${audioFileFormat.toString()}`;
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
  Seatbelt = 'seatbelt',
}

export enum AudioFileFormat {
  Wav = 'wav',
  Mp3 = 'mp3',
  Ogg = 'ogg',
}
