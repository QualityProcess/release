// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskActivityItemRoutingModule } from './edit-task-activity-item-routing.module';
import { TaskActivityItemFormModule } from './../task-activity-item-form/task-activity-item-form.module';

// components
import { EditTaskActivityItemComponent } from './edit-task-activity-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskActivityItemFormModule,
    EditTaskActivityItemRoutingModule
  ],
  declarations: [EditTaskActivityItemComponent]
})
export class EditTaskActivityItemModule { }
