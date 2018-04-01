import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './../task/task.resolver';

// components
import { ConfigTaskComponent } from './config-task.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigTaskComponent,
    resolve: { taskData: TaskResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigTaskRoutingModule { }
