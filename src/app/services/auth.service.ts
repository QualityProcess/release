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

  authContext: any;

  private tabAuthenticated: boolean = false;
  private msContext: any;
  private _token: string;
  private _username: string;
  private _userInfo: any;
  private _isMSTab: boolean = false;
  public isTabAuthenticated: boolean = false;

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

  // AAD tab authentication - details https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-tab-aad
  tabAuthentication() {

    microsoftTeams.initialize();

    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/tab-auth-modal",
      width: 600,
      height: 535,
      successCallback: (result) => {
        console.log("Success: ", result);

        microsoftTeams.getContext((context) => {
          console.log("MS tab context: ", context);

          let userInfo = { userName: context.upn };

          this.userService.userInfo = userInfo;
          this.tabAuthenticated = true;

          console.log("userInfo: ", this.userService.userInfo);
          console.log("this.router: ", this.router);
          console.log("parseUrl: ", this.parseUrl(context.entityId, "pathname"));

          this.goToTabPage(context);
          
        });

      },
      failureCallback: (reason) => {
        console.log("Fail: ", reason);
        this.goToLoginPage();
      }
    });

  }

  goToTabPage(context) {

    console.log(this.router);
    if (context.entityId) {
      this.router.navigate([this.parseUrl(context.entityId, "pathname")]);
    } else {
      this.router.navigate(["projects"]);
    }
  }

  goToLoginPage() {
    this.router.navigate(["login"]);
  }

  get userInfo(): any {
    return this.authContext ? this.authContext.getCachedUser() : null;
  }

  get authenticated(): boolean {
    return this.adal5Service.userInfo.authenticated;
  }

  //  Silent authentication AAD - details https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-silent-AAD
  silentAuthentication() {
    
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      console.log("MS tab context: ", context);

      this.msContext = context;

      // Generate random state string and store it, we can verify it in the callback
      let state = this._guid();
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      if (context.upn) {
        environment.azureConfiguration.extraQueryParameters = "scope=openid+profile&prompt=admin_consent&login_hint=" + encodeURIComponent(context.upn);
      } else {
        environment.azureConfiguration.extraQueryParameters = "scope=openid+profile&prompt=admin_consent";
      }

      this.authContext = new AuthenticationContext(environment.adal5Config);

      console.log("Azure getCachedUser object:", this.authContext.getCachedUser());

      // See if there's a cached user and it matches the expected user
      let user = this.authContext.getCachedUser();

      console.log("context.upn: ", context.upn);

      if (user) {
        if (user.userName !== context.upn) {
          // User doesn't match, clear the cache
          this.authContext.clearCache();
        }
      }

      let token = this.authContext.getCachedToken(environment.azureConfiguration.clientId);

      if (token) {

        console.log("SSO succsess with token: ", token);

        // get Graph token
        this.getGraphToken();

        if (this.authContext) {
          console.log(this.authContext.getCachedUser());
        }
        
        this.userService.userInfo = this.authContext ? this.authContext.getCachedUser() : context.upn;
        this.userService.username = context.upn;

        // redirect to MS tab 
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

  getGraphToken(){
    this.authContext.acquireToken(environment.graphApi, function (error, token) {
      if (error || !token) {
        console.log("ADAL error occurred: " + error);
        
        //throw new Error("Get graph token fail!");
      }
      else {
        console.log("Graph token: ", token);
        this.getGraphData(token).subscribe((data) => {
          console.log("Graph data: ", data);
        });
      }
    });
  }

  getGraphData(token): Observable<{}>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.get(`${environment.graphApi}`, httpOptions);
  }

  public get accessToken() {
    return this.authContext ? this.authContext.getCachedUser() : null;
  }

  public get isAuthenticated() {
    return this.tabAuthenticated || this.accessToken;
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

        this.userService.userInfo = this.authContext ? this.authContext.getCachedUser() : null;
        this.router.navigate(['projects']);
      }
    });
  }

  setAccessToken(value: string) {
    this._token = value;
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
