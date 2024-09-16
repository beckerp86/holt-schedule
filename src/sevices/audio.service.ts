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
  private readonly audioFileExtension = 'mp3';

  public playWarningSound(): void {
    if (!this.localStorageService.isAudioEnabled) return;
    this.howl(this.getFilepath());
  }

  private howl(src: string): void {
    try {
      const sound = new Howl({ src });
      sound.play();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  private getFilepath(): string {
    const variant = this.localStorageService.preferredChimeVariant;
    const fileName = variant.length > 0 ? `chime-${variant}` : 'chime';
    const fileNameWithExt = `${fileName}.${this.audioFileExtension}`;

    return `${this.environmentService.assetsPath}/${fileNameWithExt}`;
  }
}
