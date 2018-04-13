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
export class AuthGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private authService: AuthService,
   private userService: UserService,
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

    if (this.authService.userInfo || localStorage.getItem('currentUser') || this.authService.authenticated) {
      console.log("pre USER: ", this.authService.authenticated);
      if (this.authService.userInfo) {
        this.userService.userInfo = this.authService.userInfo;
        console.log("userService: ", this.authService.userInfo);

        this.authService.getUserDisplayedName().subscribe((user) => {
          console.log("USER: ", user);
        });
      }
      

      return true;
    } else {
      console.log("pre USER: ", this.authService.userInfoAdal);
      this.router.navigate(['/tab-auth']);
      return false;
    }
  }
}
