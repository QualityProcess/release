import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string = 'Admin';
  isTab: boolean = false;
  breadcrumbs: BreadCrumb[];

  constructor(
    private authService: AuthService,
    private breadCrumbsService: BreadCrumbsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.breadCrumbsService.breadcrumbs.subscribe((val: BreadCrumb[]) => {
        this.breadcrumbs = val;
    });

    if (this.authService.username) {
      this.isTab = true;
      this.username = this.authService.username;
    }
    
  }

  logout() {
    this.authService.logout();
    if (this.authService.isMSTab) {
      this.router.navigate(['/tab-auth']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
