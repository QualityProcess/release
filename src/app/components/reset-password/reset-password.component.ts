import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {
    this.resetPasswordForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  onSubmit() {
    const val = this.resetPasswordForm.value;
    this.loading = true;

    /*this.message = this.authService.resetPassword(val.email);

    this.snackBar.open(this.message, '', {
      duration: 5000,
    });*/
    this.loading = false;

  }

}
