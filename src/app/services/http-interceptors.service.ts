import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OauthUser } from '../interfaces';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService {

  isLogin = false;
  currentUser: OauthUser;

  constructor(
    private oauthService: OauthService,
  ) {
    this.getIsLogin();
  }

  getIsLogin(): void {
    this.currentUser = this.oauthService.currentUserValue;
    if (this.currentUser !== null) {
      this.isLogin = true;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = request;

    modifiedReq = modifiedReq.clone({
      withCredentials: environment.REQUEST_CREDENTIALS,
    });

    if (this.isLogin && !modifiedReq.headers.has('Authorization')) {
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.currentUser.accessToken)
      });
    }

    return next.handle(modifiedReq);
    // return next.handle(modifiedReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      // console.log(err);
      // const getErrorCode = err.status || 0;
      // if (getErrorCode === 401) {
        // console.log('Run 401');
      // }
      // if (err instanceof HttpErrorResponse) {
        // this.errorHandler.handleError(err);
      // }
    // }));
  }
}
