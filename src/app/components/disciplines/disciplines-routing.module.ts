import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DisciplinesComponent } from './disciplines.component';

const routes: Routes = [
  {
    path: '',
    component: DisciplinesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinesRoutingModule { }
