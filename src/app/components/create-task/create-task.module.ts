import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskRoutingModule } from './create-task-routing.module';
import { TaskFormModule } from './../task-form/task-form.module';

// components
import { CreateTaskComponent } from './create-task.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskFormModule,
    CreateTaskRoutingModule
  ],
  declarations: [CreateTaskComponent]
})
export class CreateTaskModule { }
