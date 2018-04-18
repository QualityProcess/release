import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './../task/task.resolver';

// components
import { GanttViewComponent } from './gantt-view.component';

const routes: Routes = [{
  path: '',
  component: GanttViewComponent,
  //resolve: { taskData: TaskResolver }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttViewRoutingModule { }
