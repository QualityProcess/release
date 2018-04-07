// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskActivityItemRoutingModule } from './create-task-activity-item-routing.module';

// components
import { CreateTaskActivityItemComponent } from './create-task-activity-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CreateTaskActivityItemRoutingModule
  ],
  declarations: [CreateTaskActivityItemComponent]
})
export class CreateTaskActivityItemModule { }
