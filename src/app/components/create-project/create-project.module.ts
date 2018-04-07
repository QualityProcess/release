// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateProjectRoutingModule } from './create-project-routing.module';

// components
import { CreateProjectComponent } from './create-project.component';
import { ProjectFormComponent } from './../project-form/project-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CreateProjectRoutingModule
  ],
  declarations: [CreateProjectComponent, ProjectFormComponent]
})
export class CreateProjectModule { }
