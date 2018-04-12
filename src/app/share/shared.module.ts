// core
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// libraries
import { MaterialModule } from './../framework/material/material.module';
import { PrimengModule } from './../framework/material/primeng.module';
import { MaterialMDCModule } from './../framework/material/material-mdc.module';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';  

// services
import { BreadCrumbsService } from './../services/breadcrumbs.service';
import { UserService } from './../services/user.service';

// dialogs
import { ConfirmDialog } from './../components/dialogs/dialog';
import { DeleteDialog } from './../components/dialogs/delete-dialog';
import { AuthDialog } from './../components/dialogs/auth-dialog';
import { LoginDialog } from './../components/login/login-dialog';
import { NotificationDialog } from './../components/dialogs/notification-dialog';

// directives
import { DraggableDirective } from './../components/project-matrix/project-matrix.component';
import { CardViewDirective } from './../components/projects/projects.component';
import { ElevationDirective } from './../components/projects/projects.component';
import { PersentageDirective } from './../components/custom-elements/percentage/percentage.component';
import { PrimeDragulaDirective } from './prime-dragula.directive';
import { MoveLeftDirective } from './../components/project-matrix/matrix.directive';

// components
import { SearchComponent } from './../components/custom-elements/search/search.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { SubNavbarComponent } from './../components/sub-navbar/sub-navbar.component';
import { FileUploaderComponent } from './../components/custom-elements/file-uploader/file-uploader.component';
import { PercentageComponent } from './../components/custom-elements/percentage/percentage.component';
import { QpSelectComponent } from './../components/custom-elements/qp-select/qp-select.component';
import { CalculationComponent } from './../components/calculation/calculation.component';
import { DesignStageFormComponent } from './../components/design-stage-form/design-stage-form.component';
import { DisciplineFormComponent } from './../components/discipline-form/discipline-form.component';
import { GoogleKeepTaskViewComponent } from './../components/google-keep-task-view/google-keep-task-view.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    MaterialMDCModule,
    PrimengModule,
    DragulaModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [

    // components 
    NavbarComponent,
    SubNavbarComponent,
    SearchComponent,
    FileUploaderComponent,
    PercentageComponent,
    QpSelectComponent,
    CalculationComponent,
    GoogleKeepTaskViewComponent,

    // dialogs
    ConfirmDialog,
    DeleteDialog,
    AuthDialog,
    LoginDialog,
    NotificationDialog,

    // directives
    PrimeDragulaDirective,
    DraggableDirective,
    CardViewDirective,
    ElevationDirective,
    PersentageDirective,
    MoveLeftDirective,
  ],
  entryComponents: [ConfirmDialog, DeleteDialog, AuthDialog, LoginDialog, NotificationDialog],
  providers: [

    // directives
    DragulaService,

    // services
    BreadCrumbsService,
    UserService,
  ],
 exports: [

   // modules
   HttpClientModule,
   MaterialModule,
   MaterialMDCModule,
   PrimengModule,
   DragulaModule,
   Ng2GoogleChartsModule,

   // components
   NavbarComponent,
   SubNavbarComponent,
   SearchComponent,
   FileUploaderComponent,
   PercentageComponent,
   QpSelectComponent,
   PrimeDragulaDirective,
   CalculationComponent,
   GoogleKeepTaskViewComponent,

   // dialogs
   ConfirmDialog,
   DeleteDialog,
   AuthDialog,
   LoginDialog,
   NotificationDialog,

   // directives
   DraggableDirective,
   CardViewDirective,
   ElevationDirective,
   PersentageDirective,
   MoveLeftDirective,
 ]
})
export class SharedModule { }
