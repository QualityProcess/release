// core
import { Routes, RouterModule } from '@angular/router';

//guard
import { AuthGuard } from './guard/auth.guard';
import { IsSecureGuard } from './guard/https.guard';

// components
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TabAuthComponent } from './components/tab-auth/tab-auth.component';

//
const appRoutes: Routes = [
  { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'tabconfig', loadChildren: './components/team-config/team-config.module#TeamConfigModule' },
  { path: 'tab-auth', component: TabAuthComponent },
  { path: 'tab-auth-modal', loadChildren: './components/tab-auth-modal/tab-auth-modal.module#TabAuthModalModule' },
  { path: 'tab-auth-end', loadChildren: './components/tab-auth-end/tab-auth-end.module#TabAuthEndModule' },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: '', loadChildren: './components/home/home.module#HomeModule', canActivate: [AuthGuard, IsSecureGuard]
  },

  { path: '**', redirectTo: 'projects' } 
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
