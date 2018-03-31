import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { DesignStageResolver } from './design-stage.resolver';

// components
import { DesignStageComponent } from './design-stage.component';

const routes: Routes = [
  {
    path: '',
    component: DesignStageComponent,
    resolve: { designStageData: DesignStageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignStageRoutingModule { }
