import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { AccessFailRoutingModule } from './access-fail-routing.module';

// components
import { AccessFailComponent } from './access-fail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    AccessFailRoutingModule
  ],
  declarations: [AccessFailComponent]
})
export class AccessFailModule { }
