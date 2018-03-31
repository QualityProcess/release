import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDesignStageRoutingModule } from './create-design-stage-routing.module';

// components
import { CreateDesignStageComponent } from './create-design-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateDesignStageRoutingModule
  ],
  declarations: [CreateDesignStageComponent]
})
export class CreateDesignStageModule { }
