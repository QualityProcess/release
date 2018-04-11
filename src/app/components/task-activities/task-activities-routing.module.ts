import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskActivitiesComponent } from './task-activities.component';

const routes: Routes = [{
  path: '',
  component: TaskActivitiesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskActivitiesRoutingModule { }
