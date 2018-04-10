import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAuthEndComponent } from './tab-auth-end.component';

const routes: Routes = [{
  path: '',
  component: TabAuthEndComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAuthEndRoutingModule { }
