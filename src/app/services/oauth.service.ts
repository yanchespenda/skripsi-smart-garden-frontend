import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OauthStatus, OauthUser, SigninResponse, SignupResponse } from '../interfaces';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private baseURL = environment.baseUrl;
  private oauthURL = `${this.baseURL}oauth/`;

  private currentUserSubject: BehaviorSubject<OauthUser>;
  public currentUser: Observable<OauthUser>;
  public isValidUser: boolean;

  private cookieName = 'credentialsUser';

  private cookieExpires = environment.COOKIES_EXPIRED;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    const tempLocal = cookieService.get(this.cookieName);
    let tempData: any;
    let isLocalPass = false;

    if (tempLocal) {
      try {
        tempData = JSON.parse(tempLocal);
        isLocalPass = true;
      } catch {
        isLocalPass = false;
      }
    }

    if (tempData && isLocalPass) {
      this.isValidUser = true;
      this.currentUserSubject = new BehaviorSubject<OauthUser>(tempData);
    } else {
      this.isValidUser = false;
      this.currentUserSubject = new BehaviorSubject<OauthUser>({username: '', accessToken: ''});
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): OauthUser {
    if (!this.isValidUser) {
      return null;
    } else {
      return this.currentUserSubject.value;
    }
  }

  credentialsSet(oauthSigninData: SigninResponse): void {
    const { username, accessToken} = oauthSigninData;

    this.credentialsDestroy(undefined);
    this.cookieService.put(this.cookieName, JSON.stringify({username, accessToken}), {
      path: '/',
      expires: new Date(new Date().getTime() + this.cookieExpires),
      secure: environment.COOKIES_SECURED
    });
  }

  credentialsDestroy(callback?: () => void): void {
    const getLogin = this.currentUserValue;
    if (getLogin === null) {
      return;
    }

    this.cookieService.remove(this.cookieName, {path: '/'});
    this.currentUserSubject.next(null);

    if (callback !== undefined && typeof callback === 'function') {
      callback();
    }
  }

  status(): Observable<OauthStatus> {
    const getAuth = this.currentUserValue;
    if (!getAuth) {
      return null;
    }

    return this.http.get<OauthStatus>(this.oauthURL + 'me');
  }

  signIn(username: string, password: string): Observable<SigninResponse> {
    const dataParams = new HttpParams()
                  .set('username', username)
                  .set('password', password);
    return this.http.post<SigninResponse>(this.oauthURL + 'signin', dataParams);
  }

  signUp(username: string, password: string, token: string): Observable<SignupResponse> {
    const dataParams = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('token', token);
    return this.http.post<SignupResponse>(this.oauthURL + 'signup', dataParams);
  }

}
