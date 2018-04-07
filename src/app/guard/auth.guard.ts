import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private adalService: Adal5Service,
   private authService: AuthService,
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

    if (this.authService.userInfo) {
      console.log("guard this.authService.userInfo:", this.authService.userInfo);
      return true;
    } else {
      console.log("guard false");
      this.router.navigate(['/tab-auth']);
      return false;
    }

    
   

    /*if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser') || this.authService.userInfo) {
        // logged in so return true
        return true;
      }

      // not logged in so redirect to login page
      
      if (this.authService.isMSTab) {
        
      } else {
        this.router.navigate(['/login']);
      }
      
      return false;
    }

    if (isPlatformServer(this.platformId)) {
      return true;
    }*/
  }
}
