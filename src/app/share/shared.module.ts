// core
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// libraries
import { MaterialModule } from './../framework/material/material.module';
import { PrimengModule } from './../framework/material/primeng.module';
import { MaterialMDCModule } from './../framework/material/material-mdc.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// services
import { BreadCrumbsService } from './../services/breadcrumbs.service';


// dialogs
import { DeleteDialog } from './../components/dialogs/delete-dialog';

// directives
import { DraggableDirective } from './../components/project-matrix/project-matrix.component';
import { CardViewDirective } from './../components/projects/projects.component';
import { ElevationDirective } from './../components/projects/projects.component';
import { PersentageDirective } from './../components/custom-elements/percentage/percentage.component';
import { PrimeDragulaDirective } from './prime-dragula.directive';

// components
import { SearchComponent } from './../components/custom-elements/search/search.component';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { SubNavbarComponent } from './../components/sub-navbar/sub-navbar.component';
import { FileUploaderComponent } from './../components/custom-elements/file-uploader/file-uploader.component';
import { PercentageComponent } from './../components/custom-elements/percentage/percentage.component';
import { ProjectFormComponent } from './../components/project-form/project-form.component';
import { TaskFormComponent } from './../components/task-form/task-form.component';
import { TaskActivityFormComponent } from './../components/task-activity-form/task-activity-form.component';

import { TaskActivitiesComponent } from './../components/task-activities/task-activities.component';
import { CreateTaskActivityComponent } from './../components/create-task-activity/create-task-activity.component';
import { CalculationComponent } from './../components/calculation/calculation.component';
import { DesignStageFormComponent } from './../components/design-stage-form/design-stage-form.component';
import { DisciplineFormComponent } from './../components/discipline-form/discipline-form.component';
import { GoogleKeepTaskViewComponent } from './../components/google-keep-task-view/google-keep-task-view.component';
import { PhasesComponent } from './../components/phases/phases.component';



import { TaskActivityItemFormComponent } from './../components/task-activity-item-form/task-activity-item-form.component';


@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    MaterialMDCModule,
    PrimengModule,
    NgSelectModule,
    DragulaModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [
    NavbarComponent,
    SubNavbarComponent,
    SearchComponent,
    FileUploaderComponent,
    ProjectFormComponent,
    TaskFormComponent,
    TaskActivityFormComponent,
    TaskActivityItemFormComponent,
    PercentageComponent,
    TaskActivitiesComponent,
    CreateTaskActivityComponent,
    CalculationComponent,
    DesignStageFormComponent,
    DisciplineFormComponent,
    GoogleKeepTaskViewComponent,
    PhasesComponent,
    DeleteDialog,
    PrimeDragulaDirective,
  ],
  entryComponents: [DeleteDialog],
  providers: [
    // directives
    DraggableDirective,
    CardViewDirective,
    ElevationDirective,
    PersentageDirective,
    DragulaService,
    BreadCrumbsService,
  ],
 exports: [

   // modules
   HttpClientModule,
   ReactiveFormsModule,
   FormsModule,
   MaterialModule,
   MaterialMDCModule,
   PrimengModule,
   NgSelectModule,
   DragulaModule,
   Ng2GoogleChartsModule,

   // components
   NavbarComponent,
   SubNavbarComponent,
   SearchComponent,
   FileUploaderComponent,
   ProjectFormComponent,
   TaskFormComponent,
   TaskActivityFormComponent,
   TaskActivityItemFormComponent,
   PercentageComponent,
   PrimeDragulaDirective,
   TaskActivitiesComponent,
   CreateTaskActivityComponent,
   CalculationComponent,
   DesignStageFormComponent,
   DisciplineFormComponent,
   GoogleKeepTaskViewComponent,
   PhasesComponent,

   // dialogs
   DeleteDialog,

 ]
})
export class SharedModule { }
