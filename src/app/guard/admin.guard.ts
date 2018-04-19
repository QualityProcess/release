// core
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// services
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service'; 

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private authService: AuthService,
   private userService: UserService,
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

    console.log("admin: ", )
    if (1 == 1 || this.userService.isAdmin) {
      console.log("Guard true");
      return true;
    } else {

       // go to Silent authentication AAD
      console.log("Guard false");
      this.router.navigate(['/access-fail']);
      return false;
    }
  }
}
