import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { DisciplinesResolver } from './../disciplines/disciplines.resolver';
import { DesignStagesResolver } from './../design-stages/design-stages.resolver';
import { ProjectsResolver } from './../projects/projects.resolver';

// components
import { CreateTaskComponent } from './create-task.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTaskComponent,
    resolve: { disciplinesData: DisciplinesResolver, designStagesData: DesignStagesResolver, projectsData: ProjectsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTaskRoutingModule { }
