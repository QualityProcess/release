import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//guard
import { AuthGuard } from './guard/auth.guard';

// components
import { LoginComponent } from './components/login';
import { HomeComponent } from './components/home';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
