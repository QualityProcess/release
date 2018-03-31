import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { GanttViewRoutingModule } from './gantt-view-routing.module';

// components
import { GanttViewComponent } from './gantt-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GanttViewRoutingModule
  ],
  declarations: [GanttViewComponent]
})
export class GanttViewModule { }
