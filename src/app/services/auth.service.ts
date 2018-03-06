import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: HttpClient) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string):boolean {

    if (email == "test@test" && password == "test") {

      let token = 'fake-token';
      this.token = token;

      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify({ token: token }));

      // return true to indicate successful login
      return true;
    } else {
      // return false to indicate failed login
      return false;
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
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
