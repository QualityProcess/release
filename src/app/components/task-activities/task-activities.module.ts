import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { TaskActivitiesRoutingModule } from './task-activities-routing.module';

// components
import { TaskActivitiesComponent } from './task-activities.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskActivitiesRoutingModule
  ],
  declarations: [TaskActivitiesComponent]
})
export class TaskActivitiesModule { }
