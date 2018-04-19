// core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// models
import { Project } from "../../models/project";

// services
import { ProjectsService } from "../../services";

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

@Component({
  selector: 'project-urls',
  templateUrl: './project-urls.component.html',
  styleUrls: ['./project-urls.component.scss']
})
export class ProjectUrlsComponent implements OnInit {
  data: any;
  arrayData: any[];
  project: Project;

  disciplineHeaders: string[] = [];
  designStageHeaders: string[] = [];

  breadcrumbs: BreadCrumb[];


  constructor(
    private service: ProjectsService,
    private breadCrumbsService: BreadCrumbsService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data.projectUrlsData;
    this.project = this.route.snapshot.data.projectData;

    // hide data
    let hide = ['LA - Environmental Impact Assessment Report', 'LA - Fire Approval 1st Stage', 'LA Fire Approval 2nd Stage (or Single Stage)', 'LA Construction License'];

    hide.forEach(el => {
      delete this.data[el];
    });

    // get names of design stages
    for (let property in this.data) {
      this.designStageHeaders.push(property);
    }

    // get names of disciplines
    for (let property in this.data[this.designStageHeaders[0]]) {
      this.disciplineHeaders.push(property);
    }

    // wrap object to array
    this.arrayData = Object.entries(this.data);
    
    this.arrayData.forEach( (designStage, index) => {
      designStage[1] = Object.entries(designStage[1]);
    });

    this.setBreadcrumbs();
  }

  setBreadcrumbs() {
    this.breadCrumbsService.setBreadcrumbs([
      {
        label: 'Projects',
        url: '/projects'
      },
      {
        label: this.project.name,
        url: `/projects/${this.project.id}/urls`
      },
    ]);
  }

  goBack() {
    this._location.back();
    //this.router.navigate(['projects']);
  }

}
