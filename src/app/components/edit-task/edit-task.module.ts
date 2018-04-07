// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskRoutingModule } from './edit-task-routing.module';

// components
import { EditTaskComponent } from './edit-task.component';
import { TaskFormComponent } from './../task-form/task-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditTaskRoutingModule
  ],
  declarations: [EditTaskComponent, TaskFormComponent]
})
export class EditTaskModule { }
