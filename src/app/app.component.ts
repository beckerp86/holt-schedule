import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeService } from '../sevices/time.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public svc = inject(TimeService);
}
