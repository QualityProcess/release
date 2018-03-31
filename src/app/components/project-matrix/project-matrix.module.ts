import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { ProjectMatrixRoutingModule } from './project-matrix-routing.module';

// resolvers
import { ProjectResolver } from './../project/project.resolver';

// components
import { ProjectMatrixComponent } from './project-matrix.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectMatrixRoutingModule
  ],
  declarations: [ProjectMatrixComponent],
  providers: [ProjectResolver]
})
export class ProjectMatrixModule { }
