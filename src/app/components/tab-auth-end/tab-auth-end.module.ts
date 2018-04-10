import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabAuthEndRoutingModule } from './tab-auth-end-routing.module';
import { TabAuthEndComponent } from './tab-auth-end.component';

@NgModule({
  imports: [
    CommonModule,
    TabAuthEndRoutingModule
  ],
  declarations: [TabAuthEndComponent]
})
export class TabAuthEndModule { }
