import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { DesignStageRoutingModule } from './design-stage-routing.module';

// components
import { DesignStageComponent } from './design-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignStageRoutingModule
  ],
  declarations: [DesignStageComponent]
})
export class DesignStageModule { }
