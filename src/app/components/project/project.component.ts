import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
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
    private service: ProjectsService
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

}

