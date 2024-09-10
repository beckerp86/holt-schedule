import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { EnvironmentService } from '../sevices/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private _audioContext?: AudioContext;
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

  public async playWavFileAsync(audioFileEnum: AudioFileEnum): Promise<void> {
    if (!this.isAudioEnabled) return;

    if (!this._audioContext) {
      this._audioContext = new window.AudioContext();
    }

    const response = await fetch(this.getFilepath(audioFileEnum), { headers: { 'Content-Type': 'audio/wav' } });
    const buffer = await this._audioContext.decodeAudioData(await response.arrayBuffer());
    if (this._sourceNode) {
      this._sourceNode.stop();
    }
    this._sourceNode = this._audioContext.createBufferSource();
    this._sourceNode.buffer = buffer;
    this._sourceNode.connect(this._audioContext.destination);
    this._sourceNode.loop = false;
    this._sourceNode.start();
  }

  private getFilepath(audioFileEnum: AudioFileEnum): string {
    return `${this.environmentService.assetsPath}/${audioFileEnum.toString()}.wav`;
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
