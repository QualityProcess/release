// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateProjectRoutingModule } from './create-project-routing.module';
import { ProjectFormModule } from './../project-form/project-form.module';

// components
import { CreateProjectComponent } from './create-project.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectFormModule,
    CreateProjectRoutingModule
  ],
  declarations: [CreateProjectComponent]
})
export class CreateProjectModule { }
