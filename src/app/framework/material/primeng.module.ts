// angular
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { DataGridModule } from 'primeng/datagrid';
import { DataListModule } from 'primeng/datalist';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    AccordionModule,
    ButtonModule,
    MenuModule,
    CardModule,
    DataGridModule,
    DataListModule,
    PanelModule,
    DropdownModule,
    PaginatorModule,
    ProgressSpinnerModule
  ]
})
export class PrimengModule {
}
