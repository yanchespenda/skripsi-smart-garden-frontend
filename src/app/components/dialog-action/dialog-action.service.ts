import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogActionService {

  private baseURL = environment.baseUrl;
  private actionURL = `${this.baseURL}api/action/`;

  constructor(
    private http: HttpClient,
  ) { }

  action(): Observable<Action> {
    return this.http.get<Action>(this.actionURL + 'setting');
  }

  flushNow(): Observable<Action> {
    return this.http.post<Action>(this.actionURL + 'flush', {
      value: 1
    });
  }
}
