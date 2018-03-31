import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDesignStageRoutingModule } from './edit-design-stage-routing.module';

// components
import { EditDesignStageComponent } from './edit-design-stage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditDesignStageRoutingModule
  ],
  declarations: [EditDesignStageComponent]
})
export class EditDesignStageModule { }
