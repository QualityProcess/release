import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectResolver } from './../project/project.resolver';

// components
import { EditProjectComponent } from './edit-project.component';

const routes: Routes = [
  {
    path: '',
    component: EditProjectComponent,
    resolve: { projectData: ProjectResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjectRoutingModule { }
