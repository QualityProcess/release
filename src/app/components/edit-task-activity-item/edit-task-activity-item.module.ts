// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskActivityItemRoutingModule } from './edit-task-activity-item-routing.module';

// components
import { EditTaskActivityItemComponent } from './edit-task-activity-item.component';
import { TaskActivityItemFormComponent } from './../task-activity-item-form/task-activity-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditTaskActivityItemRoutingModule
  ],
  declarations: [EditTaskActivityItemComponent, TaskActivityItemFormComponent]
})
export class EditTaskActivityItemModule { }
