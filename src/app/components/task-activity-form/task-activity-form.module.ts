import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';

// components
import { TaskActivityFormComponent } from './task-activity-form.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TaskActivityFormComponent],
  exports: [
    TaskActivityFormComponent
  ]
})
export class TaskActivityFormModule { }
