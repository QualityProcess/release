// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
 
// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDesignStageRoutingModule } from './create-design-stage-routing.module';

// components
import { CreateDesignStageComponent } from './create-design-stage.component';
import { DesignStageFormComponent } from './../design-stage-form/design-stage-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CreateDesignStageRoutingModule
  ],
  declarations: [CreateDesignStageComponent, DesignStageFormComponent]
})
export class CreateDesignStageModule { }
