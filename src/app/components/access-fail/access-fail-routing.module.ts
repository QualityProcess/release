import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AccessFailComponent } from './access-fail.component';

const routes: Routes = [{
  path: '',
  component: AccessFailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessFailRoutingModule { }
