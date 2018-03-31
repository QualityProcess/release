import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// resolvers
import { DisciplineResolver } from './discipline.resolver';

// components
import { DisciplineComponent } from './discipline.component';

const routes: Routes = [
  {
    path: '',
    component: DisciplineComponent,
    resolve: { disciplineData: DisciplineResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
