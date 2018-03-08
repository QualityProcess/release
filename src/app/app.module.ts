// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// framework
import { MaterialModule } from './framework/material/material.module';
import { PrimengModule } from './framework/material/primeng.module';
 
// routing 
import { routing } from './routing';

// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { AuthService, UserService, ProjectsService } from './services';

//resolvers
import { ProjectResolver } from './components/project/project.resolver';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectMatrixComponent } from './components/project-matrix/project-matrix.component';
import { PhasesComponent } from './components/phases/phases.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectMatrixComponent,
    PhasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    MaterialModule,
    PrimengModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    ProjectsService,
    ProjectResolver

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
