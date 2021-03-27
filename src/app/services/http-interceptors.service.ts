import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService {

  headerTokenName = 'X-XSRF-TOKEN';

  constructor(
    private tokenService: HttpXsrfTokenExtractor
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = request;

    modifiedReq = modifiedReq.clone({
      withCredentials: environment.REQUEST_CREDENTIALS,
    });

    // if (this.isLogin && !modifiedReq.headers.has('Authorization')) {
    //   modifiedReq = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + this.currentUser.token)
    //   });
    // }

    // const identity = (window as any).identityId || null;
    // if (identity !== null && !modifiedReq.headers.has(this.headerIdentityName)) {
    //   modifiedReq = modifiedReq.clone({headers: modifiedReq.headers.set(this.headerIdentityName, identity)});
    // }

    const token = this.tokenService.getToken();
    if (token !== null && !modifiedReq.headers.has(this.headerTokenName)) {
      modifiedReq = modifiedReq.clone({headers: modifiedReq.headers.set(this.headerTokenName, token)});
    }

    return next.handle(modifiedReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      // console.log(err);
      const getErrorCode = err.status || 0;
      if (getErrorCode === 401) {
        // console.log('Run 401');
      }
      if (err instanceof HttpErrorResponse) {
        // this.errorHandler.handleError(err);
      }
    }));
  }
}
