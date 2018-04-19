// core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

// services
import { ProjectsService } from '../../services/projects.service';

// models
import { Project } from '../../models/project';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project: Project;
  filterValue: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService,
    public dialog: MatDialog
  ) {  }

  ngOnInit() {
      this.project = this.route.snapshot.data.projectData;
  }

  gotToMatrix() {
    this.router.navigate(['projects', this.project.id, 'matrix']);
  }

  setFilter(filterValue: string) {
    this.filterValue = typeof this.filterValue === 'undefined' ? '' : filterValue;
    console.log('product Value: ', filterValue); 
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: this.project,
        title: `Delete project ${this.project.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete(this.project);
      }
    });
  }

  delete(project: Project) {

    this.service.deleteProject(project.id).subscribe(res => {
      this.router.navigate(['projects']);
    });
  }

}

