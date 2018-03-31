import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskActivityRoutingModule } from './edit-task-activity-routing.module';

// components
import { EditTaskActivityComponent } from './edit-task-activity.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditTaskActivityRoutingModule
  ],
  declarations: [EditTaskActivityComponent]
})
export class EditTaskActivityModule { }
