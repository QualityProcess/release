import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskResolver } from './../task/task.resolver';
import { DisciplinesResolver } from './../disciplines/disciplines.resolver';
import { DesignStagesResolver } from './../design-stages/design-stages.resolver';
import { ProjectsResolver } from './../projects/projects.resolver';

// components
import { EditTaskComponent } from './edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: EditTaskComponent,
    resolve: { taskData: TaskResolver, disciplinesData: DisciplinesResolver, designStagesData: DesignStagesResolver, projectsData: ProjectsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTaskRoutingModule { }
