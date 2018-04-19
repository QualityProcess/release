import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthService } from '../services/auth.service';
import { User } from '../models/index';

@Injectable()
export class UserService {

  private _username: string;
  private _userInfo: any;
  private _isAdmin = false;

  constructor() {
    this.userInfo = { userName: "Test" }
  }

  get username(): string {
    return this._username;
  }

  set username(name: string) {
    console.log(name);
    this._username = name;
  }

  get userInfo(): any {
    return this._userInfo;
  }

  set userInfo(userInfo: any) {
    this._userInfo = userInfo;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }
  /*getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('/api/users', options)
      .map((response: Response) => response.json());
  }*/

}
