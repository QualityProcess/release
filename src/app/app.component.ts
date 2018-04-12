import { Component, OnInit } from '@angular/core';

// services
import { UserService } from './services/user.service';

// adal
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaded: boolean = false;

  constructor(
    private adal5Service: Adal5Service,
    private userService: UserService
  ) {
    this.adal5Service.init(
      {
        tenant: 'atomiconium.onmicrosoft.com',
        clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
        //redirectUri: window.location.origin + '/',
        postLogoutRedirectUri: window.location.origin + '/logout'
      }
    );
  }

  ngOnInit() {
    this.loaded = true;
    this.adal5Service.handleWindowCallback();
    console.log("App this.adal5Service.userInfo: ", this.adal5Service.userInfo);
    if (this.adal5Service.userInfo){
      this.userService.userInfo = this.adal5Service.userInfo;
      this.userService.username = this.adal5Service.userInfo.username;
    }
  }
}
