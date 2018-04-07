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
  config = {
    tenant: 'atomiconium.onmicrosoft.com',
    clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
    redirectUri: window.location.origin + "/tab-auth",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: ""
  }

  authContext: any;
  private msContext: any;
  private token: string;
  
  showLoginButton: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loginWithMSTeams();
  }

  login() {
    this.loginWithMSTeams();
  }

  loginWithMSTeams() {

    microsoftTeams.initialize();
    console.log("Start loginWithMSTeams", microsoftTeams);

    microsoftTeams.getContext((context) => {
      console.log("Start 1");
      console.log(context);

      this.msContext = context;

      // Generate random state string and store it, so we can verify it in the callback
      let state = _guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      if (context.upn) {
        this.config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(context.upn);
      } else {
        this.config.extraQueryParameters = "scope=openid+profile";
      }

      this.authContext = new AuthenticationContext(this.config);

      console.log(this.authContext);

      this.authContext.login();

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

      if (this.accessToken) {
        console.log("succsess: ", this.accessToken);
        this.router.navigate(['projects']);
      } else {
        // No token, or token is expired
        console.log("fail: No token, or token is expired", this.accessToken);
        this.refreshToken();
      }

      if (this.authContext.isCallback(window.location.hash)) {
        console.log("window.location.hash: ", window.location.hash);
        this.authContext.handleWindowCallback(window.location.hash);
        if (this.authContext.getCachedUser()) {
          console.log(" microsoftTeams.authentication.notifySuccess");
          microsoftTeams.authentication.notifySuccess();
        } else {
          console.log("this.authContext.getLoginError()", this.authContext.getLoginError());
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

  public get accessToken() {
    return this.authContext ? this.authContext.getCachedToken(this.config.clientId) : null;
  }

  public get userInfo() {
    return this.authContext ? this.authContext.getCachedUser() : null;
  }

  public get isAuthenticated() {
    return this.userInfo && this.accessToken;
  }



  refreshToken() {
    this.authContext._renewIdToken((err, idToken) => {
      if (err) {
        console.log("Renewal failed: " + err);
        // Failed to get the token silently; show the login button
        this.router.navigate(['login']);
        // You could attempt to launch the login popup here, but in browsers this could be blocked by
        // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
      } else {
        console.log("refreshToken: ", this.msContext.upn);
        this.router.navigate(['projects']);
      }
    });
  }


  setAccessToken(value: string) {
    this.token = value;
  }

}
