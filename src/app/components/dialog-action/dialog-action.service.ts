import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, ActionDetail, UniversalStatusResponse } from 'src/app/interfaces';
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

  actionDetail(type: string): Observable<ActionDetail> {
    return this.http.get<ActionDetail>(this.actionURL + 'setting-' + type);
  }

  actionDetailSave(type: string, body: object): Observable<UniversalStatusResponse> {
    return this.http.post<UniversalStatusResponse>(this.actionURL + 'setting-' + type, body);
  }

  flushNow(): Observable<Action> {
    return this.http.post<Action>(this.actionURL + 'flush', {
      value: 1
    });
  }
}
