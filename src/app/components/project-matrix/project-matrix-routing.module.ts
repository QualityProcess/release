import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//resolvers
import { ProjectMatrixResolver } from './project-matrix.resolver';
import { ProjectResolver } from './../project/project.resolver';

// components
import { ProjectMatrixComponent } from './project-matrix.component';



const routes: Routes = [
  {
    path: '',
    component: ProjectMatrixComponent,
    resolve: { projectMatrixData: ProjectMatrixResolver, projectData: ProjectResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMatrixRoutingModule { }
