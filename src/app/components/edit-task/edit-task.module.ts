import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditTaskRoutingModule } from './edit-task-routing.module';

// components
import { EditTaskComponent } from './edit-task.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditTaskRoutingModule
  ],
  declarations: [EditTaskComponent]
})
export class EditTaskModule { }
