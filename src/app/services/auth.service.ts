import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


// core
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  private token: string;
  private _username: string;

  public accessToken: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('localStorage') private localStorage: any,

  ) {
    /*if (isPlatformBrowser(this.platformId)) {
      console.log('AuthService constr');
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }*/
    
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

  login(email: string, password: string): boolean {

    return false;
    /*if (isPlatformBrowser(this.platformId)) {

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
    }*/

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

    /*if (isPlatformBrowser(this.platformId)) {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }*/
  }

}
