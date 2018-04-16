import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// services
import { AuthService } from './../../services/auth.service';

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
    clientId: environment.azureConfiguration.clientId,
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
  }

  constructor(
    private router: Router,
    private authSerive: AuthService
  ) { }

  ngOnInit() {
    this.adalInit();
  }

  adalInit() {

    
    microsoftTeams.initialize();

    console.log("Authentication: ", this.authSerive.isSilentAuthentication ? "Silent" : "Tab");

    if (this.authSerive.isSilentAuthentication) {
      let authContext = new AuthenticationContext(environment.adal5Config);

      if (authContext.isCallback(window.location.hash)) {
        authContext.handleWindowCallback(window.location.hash);
        if (authContext.getCachedUser()) {
          microsoftTeams.authentication.notifySuccess();
        } else {
          microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
        }
      }
    } else {
      let hash = window.location.hash;

      if (this.getHashParameterByName("error", hash)) {
        // Authentication/authorization failed
        console.log("error", this.getHashParameterByName("error", hash));
        microsoftTeams.authentication.notifyFailure(this.getHashParameterByName("error", hash));
      } else if (this.getHashParameterByName("state", hash)) {
        console.log("state");
        // Get the stored state parameter and compare with incoming state
        // This validates that the data is coming from Azure AD
        let expectedState = localStorage.getItem("simple.state");


        if (!this.getHashParameterByName("state", hash)) {
          // State does not match, report error
          microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
        } else {
          console.log("state: ", this.authSerive.isAuthenticated);

          // Success: return token information to the tab
          microsoftTeams.authentication.notifySuccess();
          //this.router.navigate(['projects']);
        }
      } else {
        //console.log("SSO");
        //this.authSerive.tabAuthentication();
        microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
      }
    }
    

    // Setup authcontext
    /*var authContext = new AuthenticationContext(environment.azureConfiguration);
    if (authContext.isCallback(window.location.hash)) {
      console.log("calback", window.location.hash);
      console.log("authContext", authContext);
      console.log("getCachedUser", authContext.getCachedUser());
      //this.router.navigate(['projects']);

      let str = window.location.hash.replace('\#', '?');
      console.log(str);

      microsoftTeams.authentication.notifySuccess(this.getHashParameterByName("id_token", str));

      this.authSerive.isTabAuthenticated = true;
      let user = authContext.getCachedUser();

      this.router.navigate(['projects']);

      console.log("getCachedUser", user);
      if (!user) {
        microsoftTeams.authentication.notifyFailure();
         //authContext.login(); // No cached user...force login
      }
       
      else {
        authContext.acquireToken("https://graph.microsoft.com", function (error, token) {
          if (error || !token) {
            // TODO: this could cause infinite loop
            // Should use microsoftTeams.authentication.notifyFailure after one try
            authContext.login();
          }
          else {
            console.log("Graph token: ", token);
            microsoftTeams.authentication.notifySuccess(token);
            this.router.navigate(['projects']);

          }

        });

        
      }

      //authContext.handleWindowCallback(window.location.hash);
      
    }  
    else {

      // Check if user is cached
      var user = authContext.getCachedUser();
      console.log("getCachedUser", user);
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
            console.log("Graph token: ", token);

            microsoftTeams.authentication.notifySuccess(token);
          }
            
        });
      }
    }*/
  }

  getHashParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}
