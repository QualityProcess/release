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
    clientId: environment.adalAppId,
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

    console.log("Tab end");

    let hashParams = window.location.hash;

    console.log("hashParams:", hashParams);
    if (hashParams["error"]) {
      // Authentication/authorization failed
      microsoftTeams.authentication.notifyFailure(hashParams["error"]);
    } else if (hashParams["access_token"]) {
      // Get the stored state parameter and compare with incoming state
      // This validates that the data is coming from Azure AD
      let expectedState = localStorage.getItem("simple.state");
      if (expectedState !== hashParams["state"]) {
        // State does not match, report error
        microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
      } else {
        // Success: return token information to the tab
        microsoftTeams.authentication.notifySuccess({
          idToken: hashParams["id_token"],
          accessToken: hashParams["access_token"],
          tokenType: hashParams["token_type"],
          expiresIn: hashParams["expires_in"]
        })
      }
    }/* else {

      microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
    }*/

    console.log("SSO");

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
          else {
            microsoftTeams.authentication.notifySuccess(token);
          }
            
        });
      }
    }
  }

  getHashParameters() {
    return window.location.hash;
  }

}
