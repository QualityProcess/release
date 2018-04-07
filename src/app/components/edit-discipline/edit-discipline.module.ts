// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDisciplineRoutingModule } from './edit-discipline-routing.module';

// components
import { EditDisciplineComponent } from './edit-discipline.component';
import { DisciplineFormComponent } from './../discipline-form/discipline-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditDisciplineRoutingModule
  ],
  declarations: [EditDisciplineComponent, DisciplineFormComponent]
})
export class EditDisciplineModule { }
