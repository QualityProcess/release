// core
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// libraries
import { MaterialModule } from './../framework/material/material.module';
import { PrimengModule } from './../framework/material/primeng.module';
import { MaterialMDCModule } from './../framework/material/material-mdc.module';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaService, DragulaModule } from 'ng2-dragula';

// dialogs
import { DeleteDialog } from './../components/dialogs/delete-dialog';

// components
import { SearchComponent } from './../components/custom-elements/search/search.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { SubNavbarComponent } from './../components/sub-navbar/sub-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MaterialMDCModule,
    PrimengModule,
    NgSelectModule,
  ],
 declarations: [NavbarComponent, SubNavbarComponent, SearchComponent, DeleteDialog],
 entryComponents: [DeleteDialog],
 exports: [

   // modules
   FormsModule,
   MaterialModule,
   MaterialMDCModule,
   PrimengModule,
   NgSelectModule,

   // components
   NavbarComponent,
   SubNavbarComponent,
   SearchComponent,

   // dialogs
   DeleteDialog,

 ]
})
export class SharedModule { }
