import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import { AdminGuard } from './../../guard/admin.guard';

// components
import { ProjectsComponent } from './projects.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
