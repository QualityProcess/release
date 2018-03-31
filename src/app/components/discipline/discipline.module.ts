import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { DisciplineRoutingModule } from './discipline-routing.module';

// components
import { DisciplineComponent } from './discipline.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DisciplineRoutingModule
  ],
  declarations: [DisciplineComponent]
})
export class DisciplineModule { }
