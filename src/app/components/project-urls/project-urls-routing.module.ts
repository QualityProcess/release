import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectUrlsResolver } from './project-urls.resolver';
import { ProjectResolver } from './../project/project.resolver';

//components
import { ProjectUrlsComponent } from './project-urls.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectUrlsComponent,
    resolve: { projectUrlsData: ProjectUrlsResolver, projectData: ProjectResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectUrlsRoutingModule { }
