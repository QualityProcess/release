import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskActivityResolver } from './../task-activity/task-activity.resolver';

// components
import { EditTaskActivityComponent } from './edit-task-activity.component';

const routes: Routes = [
  {
    path: '',
    component: EditTaskActivityComponent,
    resolve: {
      taskActivityData: TaskActivityResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTaskActivityRoutingModule { }
