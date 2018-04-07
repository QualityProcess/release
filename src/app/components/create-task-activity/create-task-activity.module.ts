// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskActivityRoutingModule } from './create-task-activity-routing.module';
import { TaskActivityFormModule } from './../task-activity-form/task-activity-form.module';

// components
import { CreateTaskActivityComponent } from './create-task-activity.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskActivityFormModule,
    CreateTaskActivityRoutingModule
  ],
  declarations: [CreateTaskActivityComponent]
})
export class CreateTaskActivityModule { }
