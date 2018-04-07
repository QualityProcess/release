import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { DesignStagesRoutingModule } from './design-stages-routing.module';
import { DesignStageFormModule } from './../design-stage-form/design-stage-form.module';

// components
import { DesignStagesComponent } from './design-stages.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignStageFormModule,
    DesignStagesRoutingModule
  ],
  declarations: [DesignStagesComponent]
})
export class DesignStagesModule { }
