import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabAuthModalRoutingModule } from './tab-auth-modal-routing.module';
import { TabAuthModalComponent } from './tab-auth-modal.component';

@NgModule({
  imports: [
    CommonModule,
    TabAuthModalRoutingModule
  ],
  declarations: [TabAuthModalComponent]
})
export class TabAuthModalModule { }
