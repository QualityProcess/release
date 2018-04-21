import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

// environmnet
import { environment } from './../../../environments/environment';

// services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

// models
import { Task } from './../../models/task';

@Component({
  selector: 'middle-nav-bar',
  templateUrl: './middle-nav-bar.component.html',
  styleUrls: ['./middle-nav-bar.component.scss']
})
export class MiddleNavBarComponent implements OnInit {

  username: string = 'Admin';
  isTab: boolean = false;
  public version: string = environment.version;
  breadcrumbs: BreadCrumb[];
  @Input() task: Task;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private breadCrumbsService: BreadCrumbsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.breadCrumbsService.breadcrumbs.subscribe((val: BreadCrumb[]) => {
      this.breadcrumbs = val;
    });

    console.log(this.userService.userInfo.userName);
    if (this.userService.userInfo.userName) {
      this.isTab = true;
      this.username = this.userService.userInfo.userName;
    }

  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
