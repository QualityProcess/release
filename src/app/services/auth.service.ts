// core
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { isPlatformServer, isPlatformBrowser, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

// environment
import { environment } from './../../environments/environment';

// adal
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

// services
import { UserService } from './user.service';

// global variables
declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Injectable()
export class AuthService {

  private graphApi = "https://graph.microsoft.com/v1.0";
  private AADGraphApi = "https://graph.windows.net/396d56da-a9f2-4a3a-8320-7e307ed56f8c/me?api-version=1.6";

  authContext: any;
  private conf = {
    tenant: "common",
    clientId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    //scope: "https://graph.microsoft.com/.default",
    resource: "https://graph.windows.net/",
    //resourceId: "33ba2f87-fb33-467b-94a6-0e6b68611d94"
  };

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

    this.adal5Service.init(environment.adal5Config);

    this.adalLogin();

  }

  adalLogin() {

    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/tab-auth-modal",
      width: 600,
      height: 535,
      successCallback: function (result) {
        console.log("Success: ",result.accessToken);
      },
      failureCallback: function (reason) {
        console.log("Fail: ", reason);
      }
    });






    /*this.adal5Service.handleWindowCallback();
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
      this.adalLogin();
    }*/
  }

  get userInfo(): any {
    return this.authContext ? this.authContext.getCachedUser() : null;
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
        this.conf.extraQueryParameters = "scope=openid+profile&prompt=admin_consent&login_hint=" + encodeURIComponent(context.upn);
      } else {
        this.conf.extraQueryParameters = "scope=openid+profile&prompt=admin_consent";
      }

      console.log("config: ", environment.msTeamsConfig);

      this.authContext = new AuthenticationContext(this.conf);

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

      let token = this.authContext.getCachedToken(this.conf.clientId);

      if (token) {

        this.getUserDisplayedName(this.accessToken);
        this.getGraph(this.accessToken);

        
        this.getGraphToken().subscribe((token) => {
          console.log(token);
          this.getUserDisplayedNameSbc(token).subscribe(res => { console.log(res)});
        });
        console.log("succsess: ", );
        if (this.authContext) {
          console.log(this.authContext.getCachedUser());
        }
        
        this.userService.userInfo = this.authContext ? this.authContext.getCachedUser() : context.upn;
        this.userService.username = context.upn;
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

  getGraphToken(): Observable<any> {
    

    let params = new HttpParams();
    params = params.append('client_id', "dad407b2-83d0-4e52-9b43-ba1940b9d9e9");
    params = params.append('scope', "user.read");
    params = params.append('redirect_uri', "https://graph.microsoft.com/");
    params = params.append('client_secret', "18cYNwWKQOk/9FAHWkZCs8YoRcvagAkUxn/ALvz+BCw=");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),

    };

    let data = {

      authority: 'https://login.microsoftonline.com/',
      client_id: 'dad407b2-83d0-4e52-9b43-ba1940b9d9e9',
      response_type: 'id_token',
      post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`,
      filterProtocolClaims: true,
      loadUserInfo: true,
      metadata: {
        issuer: 'https://sts.windows.net/396d56da-a9f2-4a3a-8320-7e307ed56f8c/',
        jwks_uri: 'https://login.microsoftonline.com/396d56da-a9f2-4a3a-8320-7e307ed56f8c/discovery/keys',
        end_session_endpoint: 'https://login.microsoftonline.com/396d56da-a9f2-4a3a-8320-7e307ed56f8c/oauth2/logout',
        authorization_endpoint: 'https://login.microsoftonline.com/396d56da-a9f2-4a3a-8320-7e307ed56f8c/oauth2/authorize'
      },
      signingKeys: ["18cYNwWKQOk/9FAHWkZCs8YoRcvagAkUxn/ALvz+BCw="],
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default',
      redirect_uri: "https://graph.microsoft.com/",
      client_secret: "18cYNwWKQOk/9FAHWkZCs8YoRcvagAkUxn/ALvz+BCw="

    }

    return this.http.post(`https://login.microsoftonline.com/common/oauth2/v2.0/token`, data, httpOptions);
  }

  getUserDisplayedName(token1){
    this.authContext.acquireToken(this.graphApi, function (error, token) {
      if (error || !token) {
        console.log("ADAL error occurred: " + error);
        //debugger;
        throw new Error("Something went badly wrong!");
      }
      else {
        console.log(token);
        this.getUserDisplayedNameSbc(token).subscribe((user) => {
          console.log("USER: ", user);
        });
      }
    });
  }

  getUserDisplayedNameSbc(token): Observable<{}>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(`${this.AADGraphApi}`, httpOptions);
  }

  getGraph(token) {
    this.authContext.acquireToken(this.AADGraphApi, function (error, token) {
      if (error || !token) {
        console.log("ADAL error occurred: " + error);
        //debugger;
        throw new Error("Something went badly wrong!");
      }
      else {
        console.log(token);
        this.getGrapth(token).subscribe((user) => {
          console.log("USER: ", user);
        });
      }
    });
  }

  getGrapth(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(`${this.AADGraphApi}/me`, httpOptions);
  }

  public get accessToken() {
    return this.authContext ? this.authContext.getCachedToken(this.conf.clientId) : null;
  }

  /*public get userInfo(): any {
    return this._userInfo;
  }*/

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

        this.userService.userInfo = this.authContext ? this.authContext.getCachedUser() : null;
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
