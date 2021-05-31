import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { OauthService } from '../services/oauth.service';

import { OauthGuard } from './oauth.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('OauthGuard', () => {
  let guard: OauthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<OauthService>;

  // const dummyRoute = {} as ActivatedRouteSnapshot;
  // const fakeUrls = ['/'];

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']); // [1]
    serviceStub = {}; // [2]
    guard = new OauthGuard(serviceStub as OauthService, routerSpy); // [3]
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   guard = TestBed.inject(OauthGuard);
  // });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
