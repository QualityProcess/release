import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { CreateProjectComponent } from './create-project.component';

const routes: Routes = [
  {
    path: '',
    component: CreateProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProjectRoutingModule { }
