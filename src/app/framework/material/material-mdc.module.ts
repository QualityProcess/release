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
  MdcCardModule,
  MdcElevationModule,
  MdcFormFieldModule,
  MdcSwitchModule
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
    MdcCardModule,
    MdcElevationModule,
    MdcFormFieldModule,
    MdcSwitchModule
  ]
})
export class MaterialMDCModule {
}
