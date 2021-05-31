import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppModule } from '../app.module';
import { OauthUser } from '../interfaces';

import { OauthService } from './oauth.service';

describe('OauthService', () => {
  let service: OauthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ],
      providers: [
        OauthService
      ]
    });
    service = TestBed.inject(OauthService);
    httpMock = TestBed.inject(HttpTestingController);

    service.isValidUser = true;
    service.currentUserSubject = new BehaviorSubject<OauthUser>({username: '', accessToken: ''});
  });

  it('should error if an Authorization header empty or invalid', () => {
    service.status().subscribe(() => {
      fail('expected an error, not value');
    }, error => {
      expect(error.message).toContain('Unauthorized');
    });

    const request = httpMock.expectOne(`${service.oauthURL}me`);
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
