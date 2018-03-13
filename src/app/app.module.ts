// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, LocationStrategy, HashLocationStrategy } from '@angular/common';

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
import { DesignStageResolver } from './components/design-stage/design-stage.resolver';
import { TaskResolver } from './components/task/task.resolver';
import { TasksResolver } from './components/tasks/tasks.resolver';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// directives
import { DraggableDirective } from './components/project-matrix/project-matrix.component';
import { CardViewDirective } from './components/projects/projects.component';
import { ElevationDirective } from './components/projects/projects.component';

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
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { FileUploaderComponent } from './components/custom-elements/file-uploader/file-uploader.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { CreateDisciplineComponent } from './components/create-discipline/create-discipline.component';
import { DisciplineFormComponent } from './components/discipline-form/discipline-form.component';
import { EditDisciplineComponent } from './components/edit-discipline/edit-discipline.component';
import { CreateDesignStageComponent } from './components/create-design-stage/create-design-stage.component';
import { DesignStageFormComponent } from './components/design-stage-form/design-stage-form.component';
import { EditDesignStageComponent } from './components/edit-design-stage/edit-design-stage.component';
import { DesignStageComponent } from './components/design-stage/design-stage.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

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
    TasksComponent,
    GoogleKeepTaskViewComponent,
    DisciplinesComponent,
    DesignStagesComponent, 
    DisciplineComponent,
    HorizontalHistogramComponent,
    GtanttViewComponent,
    NavbarComponent,
    DraggableDirective,
    CardViewDirective,
    ElevationDirective,
    LoginDialog,
    SubNavbarComponent,
    SearchComponent,
    CreateProjectComponent,
    ProjectFormComponent,
    FileUploaderComponent,
    EditProjectComponent,
    CreateDisciplineComponent,
    DisciplineFormComponent,
    EditDisciplineComponent,
    CreateDesignStageComponent,
    DesignStageFormComponent,
    EditDesignStageComponent,
    DesignStageComponent,
    CreateTaskComponent,
    TaskFormComponent,
    EditTaskComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    //ServerModule,
    //ModuleMapLoaderModule,

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
    DesignStageResolver,
    TaskResolver,
    TaskService,
    //TasksResolver,
    { provide: 'localStorage', useFactory: getLocalStorage },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
