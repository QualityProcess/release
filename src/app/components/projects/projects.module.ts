import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

// components
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    ProjectsRoutingModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
