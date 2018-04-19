import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {
    this.registrationForm = this.fb.group({
      username: [null, Validators.required],
      company: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  onSubmit() {
    const val = this.registrationForm.value;
    this.loading = true;

    /*let result = this.authService.registration(val);

    if (result === true) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Username or password is incorrect';

      this.snackBar.open(this.error, '', {
        duration: 2000,
      });

      this.loading = false;
      setTimeout(() => { this.error = '' }, 4000);
    }*/
  }
}
