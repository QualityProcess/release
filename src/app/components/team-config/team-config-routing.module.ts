import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { ProjectsResolver } from './../projects/projects.resolver';

// components
import { TeamConfigComponent } from './team-config.component';


const routes: Routes = [{ path: '', component: TeamConfigComponent, resolve: { projectsData: ProjectsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamConfigRoutingModule { }
