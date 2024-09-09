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
    const response = await fetch(this.getFilepath(audioFileEnum));
    await this._audioContext.decodeAudioData(await response.arrayBuffer(), this.playFromBuffer.bind(this));
  }

  private getFilepath(audioFileEnum: AudioFileEnum): string {
    return `${this.environmentService.assetsPath}/${audioFileEnum.toString()}.mp3`;
  }

  private playFromBuffer(buffer: AudioBuffer): void {
    if (this._sourceNode) {
      this._sourceNode.stop();
    }
    this._sourceNode = this._audioContext.createBufferSource();
    this._sourceNode.buffer = buffer;
    this._sourceNode.connect(this._audioContext.destination);
    this._sourceNode.loop = false;
    this._sourceNode.start();
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
