import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

// components
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  declarations: [ProjectComponent]
})
export class ProjectModule { }
