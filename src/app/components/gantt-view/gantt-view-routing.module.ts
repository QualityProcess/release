import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { GanttViewComponent } from './gantt-view.component';

const routes: Routes = [{
  path: '',
  component: GanttViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttViewRoutingModule { }