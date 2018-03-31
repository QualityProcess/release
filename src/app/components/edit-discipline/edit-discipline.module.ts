import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { SharedModule } from './../../share/shared.module';
import { EditDisciplineRoutingModule } from './edit-discipline-routing.module';

// components
import { EditDisciplineComponent } from './edit-discipline.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditDisciplineRoutingModule
  ],
  declarations: [EditDisciplineComponent]
})
export class EditDisciplineModule { }
