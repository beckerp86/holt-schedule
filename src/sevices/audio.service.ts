import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { EnvironmentService } from '../sevices/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly _audioContext: AudioContext = new AudioContext();
  private _sourceNode?: AudioBufferSourceNode;

  constructor() {}

  private environmentService = inject(EnvironmentService);
  private _isAudioEnabledByUser = false;

  get isAudioEnabled(): boolean {
    return this._isAudioEnabledByUser;
  }

  public toggleAudio(): void {
    this._isAudioEnabledByUser = !this._isAudioEnabledByUser;
  }

  public async playMp3Async(audioFileEnum: AudioFileEnum): Promise<void> {
    if (!this.isAudioEnabled) return;
    try {
      const url = this.getFilepath(audioFileEnum);
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this._audioContext.decodeAudioData(arrayBuffer);

      if (this._sourceNode) {
        this._sourceNode.stop();
      }
      this._sourceNode = this._audioContext.createBufferSource();
      this._sourceNode.buffer = audioBuffer;
      this._sourceNode.connect(this._audioContext.destination);
      this._sourceNode.start(0);
    } catch (error) {
      console.error('Error loading or decoding audio:', error);
    }
  }

  private getFilepath(audioFileEnum: AudioFileEnum): string {
    return `${this.environmentService.assetsPath}/${audioFileEnum.toString()}.mp3`;
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
