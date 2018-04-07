import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';

import { DesignStageFormComponent } from './design-stage-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DesignStageFormComponent],
  exports: [
    DesignStageFormComponent
  ]
})
export class DesignStageFormModule { }
