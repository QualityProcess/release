// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDisciplineRoutingModule } from './create-discipline-routing.module';
import { DisciplineFormModule } from './../discipline-form/discipline-form.module';

// components
import { CreateDisciplineComponent } from './create-discipline.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DisciplineFormModule,
    CreateDisciplineRoutingModule
  ],
  declarations: [CreateDisciplineComponent]
})
export class CreateDisciplineModule { }
