import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { CreateDesignStageComponent } from './create-design-stage.component';

const routes: Routes = [
  {
    path: '',
    component: CreateDesignStageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateDesignStageRoutingModule { }
