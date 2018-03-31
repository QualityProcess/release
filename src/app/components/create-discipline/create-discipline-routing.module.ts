import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { CreateDisciplineComponent } from './create-discipline.component';

const routes: Routes = [
  {
    path: '',
    component: CreateDisciplineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateDisciplineRoutingModule { }
