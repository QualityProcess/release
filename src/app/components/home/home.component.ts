import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

declare var microsoftTeams: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private items: MenuItem[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //console.log("Home redirect");

    microsoftTeams.authentication.authenticate({
        url: window.location.origin + '/#/login',
        width: 600,
        height: 535,
        successCallback: function (result) {
            console.log(result.accessToken);
            if (this.router.url === '/') this.router.navigate(['projects']);
        },
        failureCallback: function (reason) {
            console.error(reason);
        }
    });




    
  }

}
