import { EnvironmentService } from '../sevices/environment.service';
import { Howl } from 'howler';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private environmentService = inject(EnvironmentService);
  private localStorageService = inject(LocalStorageService);

  public howlSeatbelt(): void {
    this.howl(this.getFilepath(AudioFileEnum.Seatbelt, AudioFileFormat.Mp3));
  }

  public howlChime(): void {
    this.howl(this.getFilepath(AudioFileEnum.Chime, AudioFileFormat.Wav));
  }

  private howl(src: string): void {
    if (!this.localStorageService.isAudioEnabled) return;
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
