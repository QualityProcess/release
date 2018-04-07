// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDesignStageRoutingModule } from './create-design-stage-routing.module';
import { DesignStageFormModule } from './../design-stage-form/design-stage-form.module';

// components
import { CreateDesignStageComponent } from './create-design-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignStageFormModule,
    CreateDesignStageRoutingModule
  ],
  declarations: [CreateDesignStageComponent]
})
export class CreateDesignStageModule { }
