import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { BarViewRoutingModule } from './bar-view-routing.module';

// components
import { BarViewComponent } from './bar-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BarViewRoutingModule
  ],
  declarations: [BarViewComponent]
})
export class BarViewModule { }
