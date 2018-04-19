import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAuthSilentComponent } from './tab-auth-silent.component';

const routes: Routes = [{
  path: '',
  component: TabAuthSilentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAuthSilentRoutingModule { }
