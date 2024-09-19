import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;

  get isDevModeEnabled(): boolean {
    return this.get<boolean>(LocalStorageKey.IsDevMode) ?? false;
  }

  get devModeEmulatedDateTime(): Date | null {
    const localStorageValue: string | null = this.get<string>(
      LocalStorageKey.DevModeEmulatedDateTime
    );
    return !localStorageValue ? null : new Date(localStorageValue);
  }

  get isDevTestingWithCustomDate(): boolean {
    return this.isDevModeEnabled && this.devModeEmulatedDateTime !== null;
  }

  get isAudioEnabled(): boolean {
    return this.get<boolean>(LocalStorageKey.IsAudioEnabled) ?? false;
  }

  get preferredChimeVariant(): string {
    return this.get<string>(LocalStorageKey.PreferredChimeVariant) ?? '';
  }

  setAudioEnabledState(newvalue: boolean): void {
    this.set(LocalStorageKey.IsAudioEnabled, newvalue);
  }

  setDevModeEnabledState(isDevModeEnabled: boolean): void {
    this.set(LocalStorageKey.IsDevMode, isDevModeEnabled);
  }

  setNewDevModeEmulatedDateTime(date: Date | undefined): void {
    const newValue = !date ? '' : date.toISOString();
    this.set(LocalStorageKey.DevModeEmulatedDateTime, newValue);
  }

  setPreferredChimeVariant(chimeVariant = ''): void {
    this.set(LocalStorageKey.PreferredChimeVariant, chimeVariant.trim());
  }

  private get<T>(key: LocalStorageKey): T | null {
    const item = this.localStorage?.getItem(key.toString());

    if (!item) {
      return null;
    }

    return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
  }

  private set(key: LocalStorageKey, value: unknown): void {
    this.localStorage?.setItem(key.toString(), JSON.stringify(value));
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export enum LocalStorageKey {
  IsDevMode = 'IsDevMode',
  DevModeEmulatedDateTime = 'DevModeEmulatedDateTime',
  IsAudioEnabled = 'IsAudioEnabled',
  PreferredChimeVariant = 'PreferredChimeVariant',
}
