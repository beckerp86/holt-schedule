export abstract class AudioUtil {
  public static playChime(): void {
    new Audio('assets/chime.mp3').play();
  }
}
