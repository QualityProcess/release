import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';

// components
import { ProjectsModule } from './../projects/projects.module';
import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ProjectsModule
  ],
  declarations: [HomeComponent] 
})
export class HomeModule { }
