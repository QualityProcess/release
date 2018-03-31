import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskActivityItemRoutingModule } from './create-task-activity-item-routing.module';

// components
import { CreateTaskActivityItemComponent } from './create-task-activity-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateTaskActivityItemRoutingModule
  ],
  declarations: [CreateTaskActivityItemComponent]
})
export class CreateTaskActivityItemModule { }
