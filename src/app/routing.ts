import { Routes, RouterModule } from '@angular/router';


//guard
import { AuthGuard } from './guard/auth.guard';

// components
import { LoginComponent } from './components/login';
import { HomeComponent } from './components/home';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectResolver } from './components/project/project.resolver';
import { ProjectMatrixComponent } from './components/project-matrix/project-matrix.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
        resolve: { projectData: ProjectResolver }
      },
      {
        path: 'phases/:id/matrix',
        component: ProjectMatrixComponent
      }
    ]
  },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
