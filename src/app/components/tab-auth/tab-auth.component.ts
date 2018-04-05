import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.component.html',
  styleUrls: ['./tab-auth.component.scss']
})
export class TabAuthComponent implements OnInit {

  interval: any;
  authContext: any;
  showLoginButton: boolean = false;


  constructor(
    private authService: AuthService,
    private adalService5: Adal5Service,
  ) { }

  ngOnInit() {
    microsoftTeams.initialize();

    this.getTeamContext();
  }

  checkInitializedLibrary(): boolean {
    return typeof microsoftTeams.getContext === 'function';
  }

  getTeamContext() {
    this.showLoginButton = false;
    //this.adalService5.userInfo.authenticated;
    console.log("ADAL info: ", this.adalService5.userInfo);

    microsoftTeams.getContext(function (context) {
      // Generate random state string and store it, so we can verify it in the callback
      let state = _guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      console.log(context);

      let config = {
        tenant: 'atomiconium.onmicrosoft.com',
        clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
        redirectUri: window.location.origin + "/tab-auth",
        cacheLocation: "localStorage",
        navigateToLoginRequestUrl: false,
        extraQueryParameters: ""
      }

      if (context.upn) {
        config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(context.upn);
      } else {
        config.extraQueryParameters = "scope=openid+profile";
      }


      this.authContext = new AuthenticationContext(config); // from the ADAL.js library



      var isCallback = this.authContext.isCallback(window.location.hash);
      this.authContext.handleWindowCallback();

      // See if there's a cached user and it matches the expected user
      let user = this.authContext.getCachedUser();


      console.log("user.userName: ", user.userName);
      console.log("context.upn: ", context.upn);

      if (user) {
        if (user.userName !== context.upn) {
          // User doesn't match, clear the cache
          this.authContext.clearCache();
        }
      }

      // Get the id token (which is the access token for resource = clientId)
      let token = this.authContext.getCachedToken(config.clientId);

      console.log(token);
      if (token) {
        showProfileInformation(token);
      } else {
        // No token, or token is expired
        this.authContext._renewIdToken(function (err, idToken) {
          if (err) {
            console.log("Renewal failed: " + err);
            // Failed to get the token silently; show the login button
            showLoginButton();
            // You could attempt to launch the login popup here, but in browsers this could be blocked by
            // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
          } else {
            showProfileInformation(idToken);
          }
        });
      }

      if (this.adalService.isCallback(window.location.hash)) {
        this.authContext.handleWindowCallback(window.location.hash);
        if (this.authContext.getCachedUser()) {
          microsoftTeams.authentication.notifySuccess();
        } else {
          microsoftTeams.authentication.notifyFailure(this.authContext.getLoginError());
        }
      }

      function showProfileInformation(token) {
        console.log("LogetL ", token);
      }

      function showLoginButton() {
        console.log("Go to Login page");
        this.showLoginButton = true;
      }


      // Go to the Azure AD authorization endpoint
      /*let queryParams = {
        client_id: "33ba2f87-fb33-467b-94a6-0e6b68611d94",
        response_type: aceessToken,
        response_mode: "fragment",
        resource: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/tab-auth",
        nonce: _guid(),
        state: state,
        // The context object is populated by Teams; the upn attribute
        // is used as hinting information
        login_hint: context.upn,
      };
      let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/authorize?" + toQueryString(queryParams, null);
      window.location.assign(authorizeEndpoint);
      */
      function _guid(): string {
        return "random_string";
      }
    });

    function toQueryString(obj, prefix) {
      var str = [],
        p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
          str.push((v !== null && typeof v === "object") ?
            toQueryString(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }
  }


  login() {
    this.authContext.login();

    microsoftTeams.initialize();

    this.getTeamContext();
  }

}
