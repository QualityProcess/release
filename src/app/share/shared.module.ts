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
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


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

   // dialogs
   DeleteDialog,

 ]
})
export class SharedModule { }
