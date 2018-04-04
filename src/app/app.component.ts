import { Component, OnInit } from '@angular/core';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaded: boolean = false;

  constructor(
    private adalService: Adal5Service,
  ) {
    adalService.init({
      tenant: 'atomiconium.onmicrosoft.com', 
      clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
      redirectUri: window.location.origin + "/#/projects",
      cacheLocation: "localStorage",
      navigateToLoginRequestUrl: false,
    });

    console.log("AppComponent redirect");

    this.adalService.handleWindowCallback();

    
  }

  ngOnInit() {
    this.loaded = true;
    console.log('app loaded');    
  }
}
