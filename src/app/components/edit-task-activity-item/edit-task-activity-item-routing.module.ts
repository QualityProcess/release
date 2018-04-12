import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { TaskActivityItemsResolver } from './edit-task-activity-items.resolver';
import { ProjectResolver } from './../project/project.resolver';
import { TaskResolver } from './../task/task.resolver';

// components
import { EditTaskActivityItemComponent } from './edit-task-activity-item.component';

const routes: Routes = [
  {
    path: '',
    component: EditTaskActivityItemComponent,
    resolve: {
      taskActivityItemsData: TaskActivityItemsResolver,
      projectData: ProjectResolver,
      taskData: TaskResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTaskActivityItemRoutingModule { }
