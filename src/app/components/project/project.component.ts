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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) {
    route.params.subscribe(({ id }) => {
      service.getProject(+id).subscribe(project => {
        this.project = project;
      });
    });
  }

  ngOnInit() {
      this.project = this.route.snapshot.data.projectData;
      /*let id = this.route.snapshot.paramMap.get('id');

      this.service.getProject(+id).subscribe(project => {
        this.project = project;
      });*/
  }

  gotToMatrix() {
    this.router.navigate(['projects', this.project.id, 'matrix']);
  }

}

