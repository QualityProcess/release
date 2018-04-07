import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// components
import { TaskActivityItemFormComponent } from './task-activity-item-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TaskActivityItemFormComponent]
})
export class TaskActivityItemFormModule { }
