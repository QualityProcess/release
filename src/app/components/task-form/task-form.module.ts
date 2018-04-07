import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';

// componets
import { TaskFormComponent } from './task-form.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TaskFormComponent],
  exports: [
    TaskFormComponent
  ]
})
export class TaskFormModule { }
