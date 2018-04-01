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
import { DragulaService, DragulaModule } from 'ng2-dragula'; 

// modules
import { SharedModule } from './share/shared.module';

// routing 
import { routing } from './routing';

// guard
import { AuthGuard } from './guard/auth.guard';
import { IsSecureGuard } from './guard/https.guard'; 

// services
import { AuthService, UserService, ProjectsService } from './services';
import { TaskService } from './services/task.service';

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

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    //ServerModule,
    //ModuleMapLoaderModule,

    routing,
    //MaterialModule,
    //MaterialMDCModule,
    //PrimengModule,
    ChartsModule,
    //Ng2GoogleChartsModule,
    //NgSelectModule,
    DragulaModule
  ],
  providers: [
    AuthGuard,
    IsSecureGuard,
    AuthService,
    BreadcrumbService,
    UserService,
    ProjectsService,
    ProjectResolver,
    //ProjectsResolver,
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
  entryComponents: [],
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
