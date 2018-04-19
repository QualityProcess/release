import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { TabAuthSilentComponent } from './tab-auth-silent.component';

import { TabAuthSilentRoutingModule } from './tab-auth-silent-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TabAuthSilentRoutingModule
  ],
  declarations: [TabAuthSilentComponent]
})
export class TabAuthSilentModule { }
