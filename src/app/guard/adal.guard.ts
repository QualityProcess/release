import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

@Injectable()
export class AdalGuard implements CanActivate {

  constructor(private adalService: Adal5Service) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.adalService);
    console.log(this.adalService.userInfo);
    return this.adalService.userInfo.authenticated;
  }
}
