import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;
  get isDevModeEnabled(): boolean {
    return this.get<boolean>(LocalStorageKey.IsDevMode) ?? false;
  }

  get devModeEmulatedDateTime(): Date | null {
    return this.get<Date>(LocalStorageKey.DevModeEmulatedDateTime);
  }

  get isAudioEnabled(): boolean {
    return this.get<boolean>(LocalStorageKey.IsAudioEnabled) ?? false;
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

  private remove(key: LocalStorageKey): void {
    this.localStorage?.removeItem(key.toString());
  }

  private isJSONValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export enum LocalStorageKey {
  IsDevMode = 'IsDevMode',
  DevModeEmulatedDateTime = 'DevModeEmulatedDateTime',
  IsAudioEnabled = 'IsAudioEnabled',
}
