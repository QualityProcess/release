import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';

@Component({
  selector: 'edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  project: Project;
  saveProject: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService) { }

  ngOnInit() {
    this.project = this.route.snapshot.data.projectData;
  }

  onSaveProject() {
    this.saveProject = this.saveProject === true ? false : true;
  }

}
