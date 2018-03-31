import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { BarViewComponent } from './bar-view.component';

const routes: Routes = [
  {
    path: '',
    component: BarViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarViewRoutingModule { }
