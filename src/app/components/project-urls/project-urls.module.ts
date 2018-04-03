import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ProjectUrlsRoutingModule } from './project-urls-routing.module';

//components
import { ProjectUrlsComponent } from './project-urls.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectUrlsRoutingModule
  ],
  declarations: [ProjectUrlsComponent]
})
export class ProjectUrlsModule { }
