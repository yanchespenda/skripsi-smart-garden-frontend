import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OauthService } from '../services/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class OauthGuard implements CanActivate {

  constructor(
    private oauthService: OauthService,
    private router: Router
    ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

      const getUserData = this.oauthService.currentUserValue;
      if (getUserData) {
        try {
          const checkValid = await this.oauthService.status().toPromise();
          if (checkValid.message === 'OK') {
            return true;
          }
        } catch (error) { }
      }

      this.oauthServiceDestroy();
      return false;
  }

  oauthServiceDestroy(): void {
    this.oauthService.credentialsDestroy();
    this.router.navigate(['/oauth/signin']).then(() => {
      window.location.reload();
    });
  }

}
