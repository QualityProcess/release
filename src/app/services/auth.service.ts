import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

// core
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Injectable()
export class AuthService {

  config = {
    //tenant: 'atomiconium.onmicrosoft.com',
    clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
    redirectUri: window.location.origin + "/tab-auth",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
  }

  authContext: any;
  private msContext: any;
  private token: string;
  private _username: string;
  private _isMSTab: boolean = false;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('localStorage') private localStorage: any,
    private router: Router
  ) {
    //get token from local storage
    if (isPlatformBrowser(this.platformId)) {

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }
    
  }

  loginWithMSTeams() {
    
    microsoftTeams.initialize();
    console.log("Start loginWithMSTeams", microsoftTeams);

    microsoftTeams.getContext((context) => {
      console.log("Start 1");
      console.log(context);

      this.msContext = context;

      // Generate random state string and store it, so we can verify it in the callback
      let state = this._guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      if (context.upn) {
        this.config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(context.upn);
      } else {
        this.config.extraQueryParameters = "scope=openid+profile";
      }

      

      this.authContext = new AuthenticationContext(this.config);

      console.log(this.authContext);
      //this.authContext.login();

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

      let token = this.authContext.getCachedToken(this.config.clientId);

      if (token) {
        console.log("succsess: ", this.accessToken);
        this.router.navigate(['projects']);
      } else {
        // No token, or token is expired
        console.log("fail: No token, or token is expired");
        this.refreshToken();
      }

      /*if (this.authContext.isCallback(window.location.hash)) {
        console.log("window.location.hash: ", window.location.hash);
        this.authContext.handleWindowCallback(window.location.hash);
        if (this.authContext.getCachedUser()) {
          console.log(" microsoftTeams.authentication.notifySuccess");
          microsoftTeams.authentication.notifySuccess();
        } else {
          console.log("this.authContext.getLoginError()", this.authContext.getLoginError());
          let err = this.authContext.getLoginError();
          microsoftTeams.authentication.notifyFailure(err);
          console.log("sdf");
        }
      }*/

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

  _guid(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
        this.username = this.msContext.upn;
        this.router.navigate(['projects']);
      }
    });
  }


  setAccessToken(value: string) {
    this.token = value;
  }

  getToken() {
    return this.token;
  }

  get username(): string {
    return this._username;
  }

  set username(name: string) {
    this._username = name;
  }

  get isMSTab(): boolean {
    return this._isMSTab;
  }

  set isMSTab(isTab: boolean) {
    this._isMSTab = isTab;
  }

  login(email: string, password: string): boolean {

    if (isPlatformBrowser(this.platformId)) {

      if (email == "test@test" && password == "test") {

        let token = 'fake-token';
        this.token = token;



        console.log('AuthService login');
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }

    } 
  
    if (isPlatformServer(this.platformId)) {
      console.log('AuthService login server');
      return true;
    }

    /*return this.http.post<any>('/api/login', JSON.stringify({ email: email, password: password }))
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })*/
  }

  registration(data: any) : boolean {
    return true;
  }

  resetPassword(email: string) : string {
    return 'Answer from fake server';
  }

  logout(): void {

    this.token = null;

    if (isPlatformBrowser(this.platformId)) {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }
  }

}
