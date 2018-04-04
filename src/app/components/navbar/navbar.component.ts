import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';
import { Router } from '@angular/router';

import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string = 'Admin';
  breadcrumbs: BreadCrumb[];

  constructor(
    private authService: AuthService,
    private breadCrumbsService: BreadCrumbsService,
    private router: Router,
    private adalService: Adal5Service
  ) { }

  ngOnInit() {
    this.breadCrumbsService.breadcrumbs.subscribe((val: BreadCrumb[]) => {
        this.breadcrumbs = val;
    });

    this.username = this.adalService.userInfo.username;
  }

  logout() {
    this.adalService.logOut();

    //this.authService.logout();
    this.router.navigate(['/login']);
  }

}
