import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { isPlatformServer, isPlatformBrowser } from '@angular/common';

import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('localStorage') private localStorage: any,
    private adal5HttpService: Adal5HTTPService,
    private adal5Service: Adal5Service

  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('AuthService constr');
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }
    
  }

  public get(url: string): Observable<any> {
    const options = this.prepareOptions();
    return this.adal5HttpService.get(url, options)
  }

  private prepareOptions(): any {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.adal5Service.userInfo.token}`);
    return { headers };
  }

  login(email: string, password: string):boolean {
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
    if (isPlatformBrowser(this.platformId)) {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }
  }

}
