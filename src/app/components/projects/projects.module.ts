import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';

// components
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    ProjectsRoutingModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
