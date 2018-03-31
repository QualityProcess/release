import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ScheduleRoutingModule } from './schedule-routing.module';

// components
import { ScheduleComponent } from './schedule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ScheduleRoutingModule
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule { }
