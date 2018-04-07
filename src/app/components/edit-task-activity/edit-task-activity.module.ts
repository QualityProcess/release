// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskActivityRoutingModule } from './edit-task-activity-routing.module';

// components
import { EditTaskActivityComponent } from './edit-task-activity.component';
import { TaskActivityFormComponent } from './../task-activity-form/task-activity-form.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditTaskActivityRoutingModule
  ],
  declarations: [EditTaskActivityComponent, TaskActivityFormComponent]
})
export class EditTaskActivityModule { }
