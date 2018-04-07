import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaService, DragulaModule } from 'ng2-dragula';

// modules
import { SharedModule } from './../../share/shared.module';
import { ConfigTaskRoutingModule } from './config-task-routing.module';

// directives
import { PrimeDragulaDirective } from './../../share/prime-dragula.directive';

// components
import { ConfigTaskComponent } from './config-task.component';
import { ActivityTableComponent } from './activity-table/activity-table.component'; 

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DragulaModule,
    ConfigTaskRoutingModule
  ],
  declarations: [ConfigTaskComponent, ActivityTableComponent],
  providers: [PrimeDragulaDirective, DragulaService]
})
export class ConfigTaskModule { }
