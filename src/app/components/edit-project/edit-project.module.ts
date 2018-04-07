// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditProjectRoutingModule } from './edit-project-routing.module';

// components
import { EditProjectComponent } from './edit-project.component';
import { ProjectFormComponent } from './../project-form/project-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EditProjectRoutingModule
  ],
  declarations: [EditProjectComponent, ProjectFormComponent]
})
export class EditProjectModule { }
