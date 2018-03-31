import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskActivityRoutingModule } from './create-task-activity-routing.module';

// components
import { CreateTaskActivityComponent } from './create-task-activity.component';

@NgModule({
  imports: [
    CommonModule,
    CreateTaskActivityRoutingModule
  ],
  declarations: []
})
export class CreateTaskActivityModule { }
