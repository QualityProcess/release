import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './../task/task.resolver';

// components
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
