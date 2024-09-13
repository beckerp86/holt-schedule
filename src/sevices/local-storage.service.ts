import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  get isDevModeEnabled(): boolean {
    return localStorage.getItem(LocalStorageKeys.IsDevMode) === 'true';
  }

  setNewDevModeState(isDevModeEnabled: boolean): void {
    localStorage.setItem(LocalStorageKeys.IsDevMode, `${isDevModeEnabled}`);
  }

  get devModeEmulatedDateTime(): Date | undefined {
    const devModeEmulatedDateTime = localStorage.getItem(LocalStorageKeys.DevModeEmulatedDateTime);
    return !devModeEmulatedDateTime ? undefined : new Date(devModeEmulatedDateTime);
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
}
