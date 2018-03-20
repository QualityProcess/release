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
import { ProjectsResolver } from './components/projects/projects.resolver';
import { ProjectMatrixResolver } from './components/project-matrix/project-matrix.resolver';
import { ProjectMatrixComponent } from './components/project-matrix/project-matrix.component';
import { TaskComponent } from './components/task/task.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { DisciplineResolver } from './components/discipline/discipline.resolver';
import { DisciplinesResolver } from './components/disciplines/disciplines.resolver';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { CreateDisciplineComponent } from './components/create-discipline/create-discipline.component';
import { EditDisciplineComponent } from './components/edit-discipline/edit-discipline.component';
import { CreateDesignStageComponent } from './components/create-design-stage/create-design-stage.component';
import { EditDesignStageComponent } from './components/edit-design-stage/edit-design-stage.component';
import { DesignStagesComponent } from './components/design-stages/design-stages.component';
import { DesignStageComponent } from './components/design-stage/design-stage.component';
import { DesignStageResolver } from './components/design-stage/design-stage.resolver';
import { DesignStagesResolver } from './components/design-stages/design-stages.resolver';
import { TaskResolver } from './components/task/task.resolver';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksResolver } from './components/tasks/tasks.resolver';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

import { TaskActivitiesResolver } from './components/task-activities/task-activities.resolver';
import { TaskActivitiesComponent } from './components/task-activities/task-activities.component';
import { CreateTaskActivityComponent } from './components/create-task-activity/create-task-activity.component';
import { TaskActivityComponent } from './components/task-activity/task-activity.component';
import { EditTaskActivityComponent } from './components/edit-task-activity/edit-task-activity.component';
import { CreateTaskActivityItemComponent } from './components/create-task-activity-item/create-task-activity-item.component';
import { EditTaskActivityItemComponent } from './components/edit-task-activity-item/edit-task-activity-item.component';

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
        path: 'disciplines',
        component: DisciplinesComponent
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
        path: 'design-stages',
        component: DesignStagesComponent
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
        path: 'projects/:id/matrix',
        component: ProjectMatrixComponent,
        resolve: { projectMatrixData: ProjectMatrixResolver, projectData: ProjectResolver  }
      },
      {
        path: 'tasks',
        component: TasksComponent,
        /*resolve: {
          //tasksData: TasksResolver
        } */
      },
      {
        path: 'tasks/create',
        component: CreateTaskComponent,
        resolve: { disciplinesData: DisciplinesResolver, designStagesData: DesignStagesResolver, projectsData: ProjectsResolver}  
      }, 
      {
        path: 'tasks/:id/edit',
        component: EditTaskComponent,
        resolve: { taskData: TaskResolver, disciplinesData: DisciplinesResolver, designStagesData: DesignStagesResolver, projectsData: ProjectsResolver }
      },
      {
        path: 'tasks/:id', 
        component: TaskComponent,
        resolve: { taskData: TaskResolver }
      },
      {
        path: 'task-activities/create/:id',
        component: CreateTaskActivityComponent,
        resolve: { taskData: TaskResolver }
      },
      {
        path: 'task-activity-items/create/:id',
        component: CreateTaskActivityItemComponent,
        //resolve: { taskData: TaskResolver }
      },
    ]
  },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
