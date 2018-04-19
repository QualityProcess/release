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

  }

  loginMSTeams() {
    this.authService.tabAuthentication();
  }
}
