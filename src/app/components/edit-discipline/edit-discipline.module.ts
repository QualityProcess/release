// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDisciplineRoutingModule } from './edit-discipline-routing.module';
import { DisciplineFormModule } from './../discipline-form/discipline-form.module';
 
// components
import { EditDisciplineComponent } from './edit-discipline.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DisciplineFormModule,
    EditDisciplineRoutingModule
  ],
  declarations: [EditDisciplineComponent]
})
export class EditDisciplineModule { }
