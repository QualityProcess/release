import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

// components
import { TasksComponent } from './tasks.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule

  ],
  declarations: [TasksComponent]
})
export class TasksModule { }
