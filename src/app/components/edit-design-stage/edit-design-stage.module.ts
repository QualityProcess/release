// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDesignStageRoutingModule } from './edit-design-stage-routing.module';
import { DesignStageFormModule } from './../design-stage-form/design-stage-form.module';

// components
import { EditDesignStageComponent } from './edit-design-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignStageFormModule,
    EditDesignStageRoutingModule
  ],
  declarations: [EditDesignStageComponent]
})
export class EditDesignStageModule { }
