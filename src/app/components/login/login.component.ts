import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';



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
 public snackBar: MatSnackBar
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

}
