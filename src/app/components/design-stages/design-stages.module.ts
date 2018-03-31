import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { DesignStagesRoutingModule } from './design-stages-routing.module';

// components
import { DesignStagesComponent } from './design-stages.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignStagesRoutingModule
  ],
  declarations: [DesignStagesComponent]
})
export class DesignStagesModule { }
