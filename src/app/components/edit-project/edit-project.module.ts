// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditProjectRoutingModule } from './edit-project-routing.module';
import { ProjectFormModule } from './../project-form/project-form.module';

// components
import { EditProjectComponent } from './edit-project.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectFormModule,
    EditProjectRoutingModule
  ],
  declarations: [EditProjectComponent]
})
export class EditProjectModule { }
