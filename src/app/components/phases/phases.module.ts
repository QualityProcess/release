import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { PhasesRoutingModule } from './phases-routing.module';

// components
import { PhasesComponent } from './phases.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PhasesRoutingModule
  ],
  declarations: [PhasesComponent]
})
export class PhasesModule { }
