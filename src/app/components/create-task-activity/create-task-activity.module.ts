// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskActivityRoutingModule } from './create-task-activity-routing.module';

// components
import { CreateTaskActivityComponent } from './create-task-activity.component';
import { TaskActivityFormComponent } from './../task-activity-form/task-activity-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CreateTaskActivityRoutingModule
  ],
  declarations: [CreateTaskActivityComponent, TaskActivityFormComponent]
})
export class CreateTaskActivityModule { }
