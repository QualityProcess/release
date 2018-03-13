import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, @Inject('localStorage') private localStorage: any) {}

  canActivate() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
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
