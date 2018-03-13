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
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { CreateDisciplineComponent } from './components/create-discipline/create-discipline.component';
import { EditDisciplineComponent } from './components/edit-discipline/edit-discipline.component';
import { CreateDesignStageComponent } from './components/create-design-stage/create-design-stage.component';
import { EditDesignStageComponent } from './components/edit-design-stage/edit-design-stage.component';
import { DesignStageComponent } from './components/design-stage/design-stage.component';
import { DesignStageResolver } from './components/design-stage/design-stage.resolver';


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
        path: 'projects/create',
        component: CreateProjectComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
        resolve: { projectData: ProjectResolver }
      },
      {
        path: 'projects/:id/edit',
        component: EditProjectComponent,
        resolve: { projectData: ProjectResolver }
      },
      {
        path: 'disciplines/create',
        component: CreateDisciplineComponent
      },
      {
        path: 'disciplines/:id',
        component: DisciplineComponent,
        resolve: { disciplineData: DisciplineResolver }
      },
      {
        path: 'disciplines/:id/edit',
        component: EditDisciplineComponent,
        resolve: { disciplineData: DisciplineResolver }
      },
      {
        path: 'design-stages/create',
        component: CreateDesignStageComponent
      },
      {
        path: 'design-stages/:id',
        component: DesignStageComponent,
        resolve: { designStageData: DesignStageResolver }
      },
      {
        path: 'design-stages/:id/edit',
        component: EditDesignStageComponent,
        resolve: { designStageData: DesignStageResolver }
      },
      {
        path: 'phases/:id/matrix',
        component: ProjectMatrixComponent,
        resolve: { projectData: ProjectResolver }
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
