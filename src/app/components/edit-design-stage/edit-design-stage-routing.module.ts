import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { DesignStageResolver } from './../design-stage/design-stage.resolver';

// components
import { EditDesignStageComponent } from './edit-design-stage.component';

const routes: Routes = [
  {
    path: '',
    component: EditDesignStageComponent,
    resolve: { designStageData: DesignStageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDesignStageRoutingModule { }
