import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { DisciplineResolver } from './../discipline/discipline.resolver';

// components
import { EditDisciplineComponent } from './edit-discipline.component';

const routes: Routes = [
  {
    path: '',
    component: EditDisciplineComponent,
    resolve: { disciplineData: DisciplineResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDisciplineRoutingModule { }
