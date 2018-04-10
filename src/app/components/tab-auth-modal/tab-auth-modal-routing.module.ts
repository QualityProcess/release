import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAuthModalComponent } from './tab-auth-modal.component';

const routes: Routes = [
  {
    path: '',
    component: TabAuthModalComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAuthModalRoutingModule { }
