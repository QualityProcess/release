// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDesignStageRoutingModule } from './edit-design-stage-routing.module';

// components
import { EditDesignStageComponent } from './edit-design-stage.component';
import { DesignStageFormComponent } from './../design-stage-form/design-stage-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditDesignStageRoutingModule
  ],
  declarations: [EditDesignStageComponent, DesignStageFormComponent]
})
export class EditDesignStageModule { }
