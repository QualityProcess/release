// angular
import { NgModule } from '@angular/core';

import {
  MdcFabModule,
  MdcMenuModule,
  MdcIconModule,
  MdcDialogModule,
  MdcToolbarModule,
  MdcDrawerModule,
  MdcListModule,
  MdcCardModule
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcFabModule,
    MdcMenuModule,
    MdcIconModule,
    MdcDialogModule,
    MdcToolbarModule,
    MdcDrawerModule,
    MdcListModule,
    MdcCardModule
  ]
})
export class MaterialMDCModule {
}
