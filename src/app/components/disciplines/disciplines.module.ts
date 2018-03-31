import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { DisciplinesRoutingModule } from './disciplines-routing.module';

// components
import { DisciplinesComponent } from './disciplines.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DisciplinesRoutingModule
  ],
  declarations: [DisciplinesComponent]
})
export class DisciplinesModule { }
