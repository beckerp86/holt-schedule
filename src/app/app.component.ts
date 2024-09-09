import { ActivityComponent } from "../features/activity/activity.component";
import { Component } from '@angular/core';
import { HeaderComponent } from "../features/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActivityComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
