// core
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// services
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private authService: AuthService,
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

    if (this.authService.userInfo || localStorage.getItem('currentUser')) {
      console.log("pre USER: ");
      if (this.authService.userInfo) {
        this.authService.getUserDisplayedName().subscribe((user) => {
          console.log("USER: ", user);
        });
      }
      

      return true;
    } else {
      this.router.navigate(['/tab-auth']);
      return false;
    }
  }
}
