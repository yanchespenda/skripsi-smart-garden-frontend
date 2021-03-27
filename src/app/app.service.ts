import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartJsFormat } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseURL = environment.baseUrl;
  private baseSensorServices = `${this.baseURL}api/sensor`;

  constructor(
    private http: HttpClient,
  ) { }

  getSensor(service: string, dateFormat: number): Observable<ChartJsFormat> {
    const requestUrl = `${this.baseSensorServices}/${service}?date-format=${dateFormat}`;
    return this.http.get<ChartJsFormat>(requestUrl);
  }
}
