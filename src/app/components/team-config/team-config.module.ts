import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { MaterialModule } from './../../framework/material/material.module';
import { TeamConfigRoutingModule } from './team-config-routing.module';

// components
import { TeamConfigComponent } from './team-config.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TeamConfigRoutingModule
  ],
  declarations: [TeamConfigComponent]
})
export class TeamConfigModule { }
