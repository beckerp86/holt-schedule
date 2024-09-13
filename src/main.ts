import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './features/app/app.config';
import { AppComponent } from './features/app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
