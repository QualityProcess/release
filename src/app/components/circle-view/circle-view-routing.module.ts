import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { CircleViewComponent } from './circle-view.component';

const routes: Routes = [
  {
    path: '',
    component: CircleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircleViewRoutingModule { }
