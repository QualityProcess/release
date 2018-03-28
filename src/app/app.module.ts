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
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaService } from 'ng2-dragula';


// routing 
import { routing } from './routing';

// guard
import { AuthGuard } from './guard/auth.guard';
import { IsSecureGuard } from './guard/https.guard';

// services
import { AuthService, UserService, ProjectsService } from './services';

// Error Handlers
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';

// resolvers
import { ProjectResolver } from './components/project/project.resolver';
import { ProjectsResolver } from './components/projects/projects.resolver';
import { ProjectMatrixResolver } from './components/project-matrix/project-matrix.resolver';
import { DisciplineResolver } from './components/discipline/discipline.resolver';
import { DisciplinesResolver } from './components/disciplines/disciplines.resolver';
import { DesignStageResolver } from './components/design-stage/design-stage.resolver';
import { DesignStagesResolver } from './components/design-stages/design-stages.resolver';
import { TaskResolver } from './components/task/task.resolver';
import { TasksResolver } from './components/tasks/tasks.resolver';
import { TaskActivitiesResolver } from './components/task-activities/task-activities.resolver';
import { TaskActivityResolver } from './components/task-activity/task-activity.resolver';
import { TaskActivityItemsResolver } from './components/edit-task-activity-item/edit-task-activity-items.resolver';


// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// directives
import { DraggableDirective } from './components/project-matrix/project-matrix.component';
import { CardViewDirective } from './components/projects/projects.component';
import { ElevationDirective } from './components/projects/projects.component';
import { PersentageDirective } from './components/custom-elements/percentage/percentage.component';
import { PrimeDragulaDirective } from './share/prime-dragula.directive';

// dialogs
import { LoginDialog } from './components/login/login-dialog';
import { DeleteDialog } from './components/dialogs/delete-dialog';

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
import { TaskActivitiesComponent } from './components/task-activities/task-activities.component';
import { CreateTaskActivityComponent } from './components/create-task-activity/create-task-activity.component';
import { TaskActivityComponent } from './components/task-activity/task-activity.component';
import { EditTaskActivityComponent } from './components/edit-task-activity/edit-task-activity.component';
import { TaskActivityFromComponent } from './components/task-activity-from/task-activity-from.component';
import { ConfigTaskComponent } from './components/config-task/config-task.component';
import { CreateTaskActivityItemComponent } from './components/create-task-activity-item/create-task-activity-item.component';
import { FormTaskActivityItemComponent } from './components/form-task-activity-item/form-task-activity-item.component';
import { EditTaskActivityItemComponent } from './components/edit-task-activity-item/edit-task-activity-item.component';
import { CircleViewComponent } from './components/circle-view/circle-view.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PercentageComponent } from './components/custom-elements/percentage/percentage.component';
import { CalculationComponent } from './components/calculation/calculation.component';

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
    PersentageDirective,
    PrimeDragulaDirective,
    LoginDialog,
    DeleteDialog,
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
    TaskActivitiesComponent,
    CreateTaskActivityComponent,
    TaskActivityComponent,
    EditTaskActivityComponent,
    TaskActivityFromComponent,
    ConfigTaskComponent,
    CreateTaskActivityItemComponent,
    FormTaskActivityItemComponent,
    EditTaskActivityItemComponent,
    CircleViewComponent,
    ScheduleComponent,
    PercentageComponent,
    CalculationComponent,

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
    Ng2GoogleChartsModule,
    NgSelectModule
  ],
  providers: [
    AuthGuard,
    IsSecureGuard,
    AuthService,
    BreadcrumbService,
    UserService,
    ProjectsService,
    ProjectResolver,
    ProjectsResolver,
    ProjectMatrixResolver,
    DisciplineResolver,
    DesignStageResolver,
    TaskResolver,
    DisciplinesResolver,
    DesignStagesResolver,
    TaskService,
    HttpErrorHandler,
    MessageService,
    TasksResolver,
    TaskActivitiesResolver,
    TaskActivityResolver,
    TaskActivityItemsResolver,
    DragulaService,
    { provide: 'localStorage', useFactory: getLocalStorage },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions 
  ],
  entryComponents: [DeleteDialog],
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
