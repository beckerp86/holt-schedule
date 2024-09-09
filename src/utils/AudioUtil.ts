export abstract class AudioUtil {
  public static playMp3(audioFileEnum: AudioFileEnum): void {
    new Audio(`assets/${audioFileEnum.toString()}.mp3`).play();
  }
}

export enum AudioFileEnum {
  Chime = 'chime',
}
