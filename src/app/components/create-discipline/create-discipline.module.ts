// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDisciplineRoutingModule } from './create-discipline-routing.module';

// components
import { CreateDisciplineComponent } from './create-discipline.component';
import { DisciplineFormComponent } from './../discipline-form/discipline-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CreateDisciplineRoutingModule
  ],
  declarations: [CreateDisciplineComponent, DisciplineFormComponent]
})
export class CreateDisciplineModule { }
