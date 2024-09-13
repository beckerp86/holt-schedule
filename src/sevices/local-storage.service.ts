import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  get isDevModeEnabled(): boolean {
    return localStorage.getItem(LocalStorageKeys.IsDevMode) === 'true';
  }

  get devModeEmulatedDateTime(): Date | undefined {
    const devModeEmulatedDateTime = localStorage.getItem(LocalStorageKeys.DevModeEmulatedDateTime);
    return !devModeEmulatedDateTime ? undefined : new Date(devModeEmulatedDateTime);
  }

  get isAudioEnabled(): boolean {
    return localStorage.getItem(LocalStorageKeys.IsAudioEnabled) === 'true';
  }

  setAudioEnabledStatus(newvalue: boolean): void {
    localStorage.setItem(LocalStorageKeys.IsAudioEnabled, `${newvalue}`);
  }

  setNewDevModeState(isDevModeEnabled: boolean): void {
    localStorage.setItem(LocalStorageKeys.IsDevMode, `${isDevModeEnabled}`);
  }

  setNewDevModeEmulatedDateTime(date: Date | undefined): void {
    const newValue = !date ? '' : date.toISOString();
    localStorage.setItem(LocalStorageKeys.DevModeEmulatedDateTime, newValue);
    return;
  }
}

export enum LocalStorageKeys {
  IsDevMode = 'IsDevMode',
  DevModeEmulatedDateTime = 'DevModeEmulatedDateTime',
  IsAudioEnabled = 'IsAudioEnabled',
}
