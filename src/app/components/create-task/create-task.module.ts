import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateTaskRoutingModule } from './create-task-routing.module';

// components
import { CreateTaskComponent } from './create-task.component';

@NgModule({
  imports: [
    CommonModule,
    CreateTaskRoutingModule
  ],
  declarations: [CreateTaskComponent]
})
export class CreateTaskModule { }
