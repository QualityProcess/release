import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskRoutingModule } from './create-task-routing.module';

// components
import { CreateTaskComponent } from './create-task.component';
import { TaskFormComponent } from './../task-form/task-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateTaskRoutingModule
  ],
  declarations: [CreateTaskComponent, TaskFormComponent]
})
export class CreateTaskModule { }
