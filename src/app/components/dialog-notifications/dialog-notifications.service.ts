import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OauthStatus, NotificationBase } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogNotificationsService {

  private baseURL = environment.baseUrl;
  public actionURL = `${this.baseURL}api/action/`;

  constructor(
    private http: HttpClient,
  ) { }

  getNotifications(): Observable<NotificationBase> {
    return this.http.get<NotificationBase>(this.actionURL + 'notifications');
  }

  postNotifications({
    email,
    emailEnable,
    telegram,
    telegramEnable,
    webPush,
    webPushEnable
  }: NotificationBase): Observable<OauthStatus> {
    const dataParams: any = {};
    dataParams.email = email;
    dataParams.emailEnable = emailEnable;
    dataParams.telegram = telegram !== null ? JSON.stringify(telegram) : null;
    dataParams.telegramEnable = telegramEnable;
    dataParams.webPush = webPush;
    dataParams.webPushEnable = webPushEnable;
    return this.http.post<OauthStatus>(this.actionURL + 'notifications', dataParams);
  }

  postNotificationTelegramInit(userId: number): Observable<OauthStatus> {
    const dataParams = new HttpParams()
                  .set('userId', userId.toString());
    return this.http.post<OauthStatus>(this.actionURL + 'notifications-telegram-init', dataParams);
  }

}
