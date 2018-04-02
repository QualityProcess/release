import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './task.resolver';
import { ProjectResolver } from './../project/project.resolver';

// components
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    resolve: { taskData: TaskResolver, projectData: ProjectResolver },
    children: [
      {
        path: '',
        loadChildren: './../config-task/config-task.module#ConfigTaskModule' 
      },
      {
        path: 'schedule',
        loadChildren: './../schedule/schedule.module#ScheduleModule'
      },
      {
        path: 'gantt',
        loadChildren: './../gantt-view/gantt-view.module#GanttViewModule'
      },
      {
        path: 'bar',
        loadChildren: './../bar-view/bar-view.module#BarViewModule'
      },
      {
        path: 'circle',
        loadChildren: './../circle-view/circle-view.module#CircleViewModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
