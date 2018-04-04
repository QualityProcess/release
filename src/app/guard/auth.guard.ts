import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private adalService: Adal5Service
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser') || this.adalService.userInfo.authenticated) {
        // logged in so return true
        return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    if (isPlatformServer(this.platformId)) {
      return true;
    }
  }
}
