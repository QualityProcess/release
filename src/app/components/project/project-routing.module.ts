import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectResolver } from './project.resolver';

// components
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    resolve: { projectData: ProjectResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProjectResolver]
})
export class ProjectRoutingModule { }
