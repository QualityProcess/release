import { Routes, RouterModule } from '@angular/router';


//guard
import { AuthGuard } from './guard/auth.guard';

// components
import { LoginComponent } from './components/login';
import { HomeComponent } from './components/home';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
