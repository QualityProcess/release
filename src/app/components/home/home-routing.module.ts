import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectResolver } from './../project/project.resolver';

// components
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'projects',
        loadChildren: './../projects/projects.module#ProjectsModule',
      },
      {
        path: 'projects/create',
        loadChildren: './../create-project/create-project.module#CreateProjectModule'
      },
      {
        path: 'projects/:id',
        children: [
          {
            path: '',
            loadChildren: './../project/project.module#ProjectModule'
          },
          {
            path: 'matrix',
            loadChildren: './../project-matrix/project-matrix.module#ProjectMatrixModule'
          },
          {
            path: 'tasks',
            loadChildren: './../tasks/tasks.module#TasksModule'
          },
          {
            path: 'tasks/create',
            loadChildren: './../tasks/tasks.module#TasksModule'
          }, 
          {
            path: 'tasks/:id',
            loadChildren: './../task/task.module#TaskModule',
            children: [
              {
                path: 'task-activities/:id',
                loadChildren: './../task-activity/task-activity.module#TaskActivityModule',
                children: [
                  {
                    path: 'task-activity-items/create/:id',
                    loadChildren: './../create-task-activity-item/create-task-activity-item.module#CreateTaskActivityItemModule',
                  },
                  {
                    path: 'task-activity-items/:id/edit',
                    loadChildren: './../edit-task-activity-item/edit-task-activity-item.module#EditTaskActivityItemModule',
                  },
                ]
              },
              {
                path: 'task-activities/create/:id',
                loadChildren: './../create-task-activity/create-task-activity.module#CreateTaskActivityModule',
              },
              {
                path: 'task-activities/:id/edit',
                loadChildren: './../edit-task-activity/edit-task-activity.module#EditTaskActivityModule',
              },
            ]
          },
          {
            path: 'tasks/:id/edit',
            loadChildren: './../edit-task/edit-task.module#EditTaskModule'
          },
        ]
      },
      {
        path: 'projects/:id/edit',
        loadChildren: './../edit-project/edit-project.module#EditProjectModule'
      },
      {
        path: 'disciplines',
        loadChildren: './../disciplines/disciplines.module#DisciplinesModule'
      },
      {
        path: 'disciplines/create',
        loadChildren: './../create-discipline/create-discipline.module#CreateDisciplineModule'
      },
      {
        path: 'disciplines/:id',
        loadChildren: './../discipline/discipline.module#DisciplineModule'
      },
      {
        path: 'disciplines/:id/edit',
        loadChildren: './../edit-discipline/edit-discipline.module#EditDisciplineModule'
      },
      {
        path: 'design-stages',
        loadChildren: './../design-stages/design-stages.module#DesignStagesModule'
      },
      {
        path: 'design-stages/create',
        loadChildren: './../create-design-stage/create-design-stage.module#CreateDesignStageModule'
      },
      {
        path: 'design-stages/:id',
        loadChildren: './../design-stage/design-stage.module#DesignStageModule'
      },
      {
        path: 'design-stages/:id/edit',
        loadChildren: './../edit-design-stage/edit-design-stage.module#EditDesignStageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
