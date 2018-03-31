import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { TaskActivityRoutingModule } from './task-activity-routing.module';

// components
import { TaskActivityComponent } from './task-activity.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskActivityRoutingModule
  ],
  declarations: [TaskActivityComponent]
})
export class TaskActivityModule { }
