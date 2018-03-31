import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './../task/task.resolver';

// components
import { CreateTaskActivityComponent } from './create-task-activity.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTaskActivityComponent,
    resolve: { taskData: TaskResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTaskActivityRoutingModule { }
