import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

import { MdcDialog } from '@angular-mdc/web';
//import { AdalService } from '../../services/adal/adal.service';

import { Adal5HTTPService, Adal5Service } from 'adal-angular5';


@Component({
  selector: 'login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  //@ViewChild('rememberMe') rememberMe;

  constructor(private fb: FormBuilder,
 private authService: AuthService,
 private router: Router,
 public snackBar: MatSnackBar,
 private adalService5: Adal5Service,
) {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });

    
  }

  ngOnInit() {
    //this.adalService5.handleWindowCallback();

    // reset login status
    console.log('ngOnInit is called');
    this.authService.logout();

  }

  public logIn() {

    //this.adalService.login();

    //console.log(this.adalService5);
    this.adalService5.login();
  }

  get authenticated(): boolean {
    return this.adalService5.userInfo.authenticated;
  }


  test() {
    console.log(this.adalService5.userInfo);
    console.log(this.authenticated);  
  }
  onSubmit() {
    
    const val = this.loginForm.value;
    this.loading = true;
    let result = this.authService.login(val.email, val.password);
        /*.subscribe(
        (result) => {
          if (result === true) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Username or password is incorrect';
            this.loading = false;
          }
        }
        ); */

      if (result === true) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Username or password is incorrect';

        this.snackBar.open(this.error, '', {
          duration: 2000,
        });

        this.loading = false;
        setTimeout(() => { this.error = '' }, 4000);
      }

  }

}
