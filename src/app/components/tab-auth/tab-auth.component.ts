import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.component.html',
  styleUrls: ['./tab-auth.component.scss']
})
export class TabAuthComponent implements OnInit {

  authContext: any;
  showLoginButton: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    microsoftTeams.initialize();
    this.getTeamContext();
  }

  getTeamContext() {
    this.showLoginButton = false;

    console.log(microsoftTeams);
    console.log(microsoftTeams.authentication.getAuthToken(e => { console.log("getAuthToken: ", e) }));

    console.log(microsoftTeams.authentication.getUser(e => { console.log("getUser: ",e) }));

    console.log(microsoftTeams.authentication.getTabInstances(e => { console.log("getTabInstances: ",e) }));
    console.log(microsoftTeams.authentication.getMruTabInstances(e => { console.log("getMruTabInstances: ", e) }));

    console.log(microsoftTeams.authentication.authenticate(e => { console.log("authenticate: ", e) }));

    console.log(microsoftTeams.getContext);
    microsoftTeams.getContext( (context) => {
      console.log(context);

      // Generate random state string and store it, so we can verify it in the callback
      let state = _guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      

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

      this.authContext = new AuthenticationContext(config); 

      console.log(this.authContext);

      // See if there's a cached user and it matches the expected user
      let user = this.authContext.getCachedUser();

      console.log("context.upn: ", context.upn);

      if (user) {
        console.log("user.userName: ", user.userName);
        if (user.userName !== context.upn) {
          // User doesn't match, clear the cache
          this.authContext.clearCache();
        }
      }

      // Get the id token (which is the access token for resource = clientId)
      let token = this.authContext.getCachedToken(config.clientId);

      console.log(token);
      if (token) {
        this.showProfileInformation(token);
      } else {
        // No token, or token is expired
        this.authContext._renewIdToken( (err, idToken) => {
          if (err) {
            console.log("Renewal failed: " + err);
            // Failed to get the token silently; show the login button
            this.onShowLoginButton();
            // You could attempt to launch the login popup here, but in browsers this could be blocked by
            // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
          } else {
            console.log(context.upn);
            this.authService.username = context.upn;
            this.showProfileInformation(idToken);
          }
        });
      }

      if (this.authContext.isCallback(window.location.hash)) {
        this.authContext.handleWindowCallback(window.location.hash);
        if (this.authContext.getCachedUser()) {
          microsoftTeams.authentication.notifySuccess();
        } else {
          microsoftTeams.authentication.notifyFailure(this.authContext.getLoginError());
        }
      }

      function _guid(): string {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    });
  }

  showProfileInformation(token) {
    console.log("LogetL ", token);

    this.authService.setAccessToken(token);
    console.log("Set access token");
    this.router.navigate(['projects']);
  }

  onShowLoginButton() {
    console.log("Go to Login page");
    this.showLoginButton = true;
  }


  login() {
    this.authContext.login();

    microsoftTeams.initialize();

    this.getTeamContext();
  }

}
