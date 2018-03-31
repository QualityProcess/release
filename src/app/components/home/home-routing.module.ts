import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectResolver } from './../project/project.resolver';

// components
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'projects',
        loadChildren: './../projects/projects.module#ProjectsModule',
      },
      {
        path: 'projects/:id',
        loadChildren: './../project/project.module#ProjectModule',
        resolve: { projectData: ProjectResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
