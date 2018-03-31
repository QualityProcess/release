import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { TaskRoutingModule } from './task-routing.module';

// components
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
