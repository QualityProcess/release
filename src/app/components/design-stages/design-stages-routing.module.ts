import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DesignStagesComponent } from './design-stages.component';

const routes: Routes = [
  {
    path: '',
    component: DesignStagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignStagesRoutingModule { }
