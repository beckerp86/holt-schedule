import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeApiService {
  private http = inject(HttpClient);

  constructor() {}
  getTimeFromApi(): Observable<any> {
    return this.http.get(
      'https://worldtimeapi.org/api/timezone/America/Detroit'
    );
  }
}
