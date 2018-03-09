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
import { TaskComponent } from './components/task/task.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { DisciplineResolver } from './components/discipline/discipline.resolver';

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
        path: 'disciplines/:id',
        component: DisciplineComponent,
        resolve: { disciplineData: DisciplineResolver }
      },
      {
        path: 'phases/:id/matrix',
        component: ProjectMatrixComponent
      },
      {
        path: 'tasks/:id', 
        component: TaskComponent
      },
    ]
  },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
