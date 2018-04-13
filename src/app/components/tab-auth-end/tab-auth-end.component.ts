import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth-end',
  templateUrl: './tab-auth-end.component.html',
  styleUrls: ['./tab-auth-end.component.scss']
})
export class TabAuthEndComponent implements OnInit {

  config = {
    //tenant: 'common',
    clientId: environment.adal5Config,
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
  }


  constructor() { }

  ngOnInit() {
    this.adalInit();
  }

  adalInit() {
    // Setup authcontext
    var authContext = new AuthenticationContext(this.config);
    if (authContext.isCallback(window.location.hash))
      authContext.handleWindowCallback(window.location.hash);
    else {
      // Check if user is cached
      var user = authContext.getCachedUser();
      if (!user)
        authContext.login(); // No cached user...force login
      else {
        authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
          if (error || !token) {
            // TODO: this could cause infinite loop
            // Should use microsoftTeams.authentication.notifyFailure after one try
            authContext.login();
          }
          else
            microsoftTeams.authentication.notifySuccess(token);
        });
      }
    }
  }

  getHashParameters() {
    return window.location.hash;
  }

}
