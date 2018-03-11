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
import { MaterialMDCModule } from './framework/material/material-mdc.module';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// routing 
import { routing } from './routing';

// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { AuthService, UserService, ProjectsService } from './services';

// resolvers
import { ProjectResolver } from './components/project/project.resolver';
import { DisciplineResolver } from './components/discipline/discipline.resolver';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// directives
import { DraggableDirective } from './components/project-matrix/project-matrix.component';
import { CardViewDirective } from './components/projects/projects.component';

// dialogs
import { LoginDialog } from './components/login/login-dialog';

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
import { TaskComponent } from './components/task/task.component';
import { GoogleKeepTaskViewComponent } from './components/google-keep-task-view/google-keep-task-view.component';
import { TaskService } from './services/task.service';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { DesignStagesComponent } from './components/design-stages/design-stages.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { HorizontalHistogramComponent } from './components/horizontal-histogram/horizontal-histogram.component';
import { GtanttViewComponent } from './components/gtantt-view/gtantt-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubNavbarComponent } from './components/sub-navbar/sub-navbar.component';
import { SearchComponent } from './components/custom-elements/search/search.component';

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
    PhasesComponent,
    TaskComponent,
    GoogleKeepTaskViewComponent,
    DisciplinesComponent,
    DesignStagesComponent, 
    DisciplineComponent,
    HorizontalHistogramComponent,
    GtanttViewComponent,
    NavbarComponent,
    DraggableDirective,
    CardViewDirective,
    LoginDialog,
    SubNavbarComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    MaterialModule,
    MaterialMDCModule,
    PrimengModule,
    ChartsModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    ProjectsService,
    ProjectResolver,
    DisciplineResolver,
    TaskService

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
