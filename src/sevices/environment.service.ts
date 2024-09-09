import { Injectable } from '@angular/core';
import { IEnvironment } from '../environments/IEnvironmentModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  get production() {
    return environment.production;
  }

  get assetsPath() {
    return environment.assetsPath;
  }

  constructor() {}
}
