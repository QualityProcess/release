// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskActivityRoutingModule } from './edit-task-activity-routing.module';
import { TaskActivityFormModule } from './../task-activity-form/task-activity-form.module';

// components
import { EditTaskActivityComponent } from './edit-task-activity.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskActivityFormModule,
    EditTaskActivityRoutingModule
  ],
  declarations: [EditTaskActivityComponent]
})
export class EditTaskActivityModule { }
