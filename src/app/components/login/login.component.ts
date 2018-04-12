import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

// adal
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

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
 private adal5Service: Adal5Service
) {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });

    
  }

  ngOnInit() {
    this.authService.logout();
  }

  onSubmit() {
    
    const val = this.loginForm.value;
    this.loading = true;
    let result = this.authService.login(val.email, val.password)

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

  loginMSTeams() {

    this.authService.loginWithAdal();


    /*microsoftTeams.initialize();

    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/tab-auth-modal",
      width: 600,
      height: 535,
      successCallback: function (result) {
        console.log("Login success: ", result);
      },
      failureCallback: function (reason) {
        console.log("Handle error: ", reason);
      }
    });*/
  }

  getUserProfile(accessToken) {
    console.log("Login success: ", accessToken);
  }

  handleAuthError(reason) {
    console.log("Handle error: ", reason);
  }

}
