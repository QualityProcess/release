// core
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isPlatformServer, isPlatformBrowser, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

// adal
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

// services
import { UserService } from './user.service';

// global variables
declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Injectable()
export class AuthService {

  config = {
    //tenant: 'atomiconium.onmicrosoft.com',
    clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
  }

  private graphApi = "https://graph.microsoft.com/v1.0";

  authContext: any;
  private msContext: any;
  private _token: string;
  private _username: string;
  private _userInfo: any;
  private _isMSTab: boolean = false;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('localStorage') private localStorage: any,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private adal5Service: Adal5Service,
    private userService: UserService
  ) {
    //get token from local storage
    if (isPlatformBrowser(this.platformId)) {

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._token = currentUser && currentUser.token;
    }

    
    
  }

  loginWithAdal() {

    this.adal5Service.init(
      {
        tenant: 'atomiconium.onmicrosoft.com',
        clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
        //redirectUri: window.location.origin + '/',
        postLogoutRedirectUri: window.location.origin + '/logout'
      }
    );

    this.adal5Service.handleWindowCallback();
    console.log("App this.adal5Service.userInfo: ", this.adal5Service.userInfo);
    if (this.adal5Service.userInfo) {
      this.userService.userInfo = this.adal5Service.userInfo;
      this.userService.username = this.adal5Service.userInfo.username;
    }

    if (this.adal5Service.userInfo.authenticated) {
      console.log(this.adal5Service);
      this.userService.userInfo = this.adal5Service.userInfo;
      this.userService.username = this.adal5Service.userInfo.username;
      this.router.navigate(['projects']);
    } else {
      this.adal5Service.login();
    }

  }

  get authenticated(): boolean {
    return this.adal5Service.userInfo.authenticated;
  }

  public get userInfoAdal() {
    return this.adal5Service.userInfo;
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
        this.userService.userInfo = this.authContext ? this.authContext.getCachedUser() : null;
        this.userService.username = this._userInfo.userName;
        this.router.navigate([this.parseUrl(context.entityId, "pathname")]);
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

  getUserDisplayedName(): Observable<{}> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    };

    return this.http.get(`${this.graphApi}/users/${this.userInfo.userName}`, httpOptions);
  }

  public get accessToken() {
    return this.authContext ? this.authContext.getCachedToken(this.config.clientId) : null;
  }

  public get userInfo(): any {
    return this._userInfo;
  }

  public get isAuthenticated() {
    return this.userInfo && this.accessToken;
  }

  parseUrl(string, prop) {
    const a = document.createElement('a');
    a.setAttribute('href', string);
    const { host, hostname, pathname, port, protocol, search, hash } = a;
    const origin = `${protocol}//${hostname}${port.length ? `:${port}` : ''}`;
    return prop ? eval(prop) : { origin, host, hostname, pathname, port, protocol, search, hash }
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
    this._token = value;
  }

  getToken() {
    return this._token;
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

  get token(): string {
    return this._token;
  }

  login(email: string, password: string): boolean {

    if (isPlatformBrowser(this.platformId)) {

      if (email == "test@test" && password == "test") {

        let token = 'fake-token';
        this._token = token;



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

    this._token = null;

    if (isPlatformBrowser(this.platformId)) {
      // clear token remove user from local storage to log user out
      this._token = null;
      localStorage.removeItem('currentUser');
    }
  }

}
