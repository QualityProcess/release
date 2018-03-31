import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CircleViewRoutingModule } from './circle-view-routing.module';

// components
import { CircleViewComponent } from './circle-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CircleViewRoutingModule
  ],
  declarations: [CircleViewComponent]
})
export class CircleViewModule { }
