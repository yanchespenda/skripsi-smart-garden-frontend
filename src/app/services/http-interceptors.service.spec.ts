import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppModule } from '../app.module';
import { OauthUser } from '../interfaces';

import { HttpInterceptorsService } from './http-interceptors.service';
import { OauthService } from './oauth.service';

describe('HttpInterceptorsService', () => {
  let service: OauthService;
  let serviceInterceptor: HttpInterceptorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorsService,
          multi: true,
        },
      ]
    });
    service = TestBed.inject(OauthService);
    serviceInterceptor = TestBed.inject(HttpInterceptorsService);

    serviceInterceptor.currentUser = {
      accessToken: 'Dummy-token',
      username: 'dummy-user'
    };

    service.isValidUser = true;
    service.currentUserSubject = new BehaviorSubject<OauthUser>({username: '', accessToken: ''});

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(async () => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should error if an Authorization header empty or invalid', () => {
    service.status().subscribe(() => {
      fail('expected an error, not value');
    }, error => {
      expect(error.message).toContain('Unauthorized');
    });

    const request = httpMock.expectOne(`${service.oauthURL}me`);
    expect(request.request.headers.has('Authorization')).toEqual(true);
    expect(request.request.method).toBe('GET');
    request.flush({
      statusCode: 401,
      message: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'Unauthorized'
    });
  });
});
