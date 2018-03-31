import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { CreateDisciplineRoutingModule } from './create-discipline-routing.module';

// components
import { CreateDisciplineComponent } from './create-discipline.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateDisciplineRoutingModule
  ],
  declarations: [CreateDisciplineComponent]
})
export class CreateDisciplineModule { }
