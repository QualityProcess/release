// core
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// environment
import { environment } from './../../environments/environment';

// services
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { BreadCrumbsService } from './../services/breadcrumbs.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
   private router: Router,
   @Inject(PLATFORM_ID) private platformId: Object,
   @Inject('localStorage') private localStorage: any,
   private authService: AuthService,
   private userService: UserService,
   private breadcrumbsService: BreadCrumbsService
) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

    console.log("admin: ", )
    if ( /*environment.devAccess || */this.userService.isAdmin) {
      console.log("Guard true");
      return true;
    } else {

       // go to Silent authentication AAD
      console.log("Guard false");

      if (this.breadcrumbsService.currentProjectUrl) {
        this.router.navigate([`${this.breadcrumbsService.currentProjectUrl}/matrix`]);
      } else {
        this.router.navigate(['/access-fail']);
      }
      
      return false;
    }
  }
}
