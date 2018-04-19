import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs/observable/forkJoin';


import { Task } from "../../models/task";
import { Project } from "../../models/project";
import { Discipline } from "../../models/discipline";
import { DesignStage } from "../../models/design-stage";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";
import { Location } from '@angular/common';

// services
import { UserService } from './../../services/user.service';
import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  loaded: boolean = false;
  breadcrumbs: BreadCrumb[];
  editTask: boolean = true;
  googleKeepView: boolean = false;
  horizontalHistogramView: boolean = false;
  granttView: boolean = false;
  circleView: boolean = false;
  schedule: boolean = false;
  views: Object = { googleKeepView: true, horizontalHistogramView: false, granttView: false };
  data: Task;
  project: Project;
  discipline: Discipline;
  design_stage: DesignStage;
  taskActivities: TaskActivity[];
  taskActivityItems: TaskActivityItem[];

  constructor(
    private service: TaskService,
    private projectService: ProjectsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private breadCrumbsService: BreadCrumbsService
  ) {
    this.views['googleKeepView'] = true;
    this.views['horizontalHistogramView'] = false;
    this.views['granttView'] = false;
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.loaded = true;

    this.data = this.route.snapshot.data.taskData;
    this.project = this.route.snapshot.data.projectData;

    //this.setBreadCrumbs();

    let getDisciplineAndDesignStageToTheTask$ = forkJoin(this.projectService.getDescipline(this.data.discipline_id), this.projectService.getDesignStage(this.data.design_stage_id));

    getDisciplineAndDesignStageToTheTask$.subscribe(result => {
      this.discipline = result[0];
      this.design_stage = result[1];
      this.setBreadCrumbs(); 
    });

  }

  setBreadCrumbs() {

    if (this.userService.isAdmin) {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: 'Projects',
          url: '/projects'
        },
        {
          label: this.project.name,
          url: `/projects/${this.data.project_id}/matrix`
        },
        {
          label: this.discipline ? `${this.discipline.category} ${this.design_stage.category}` : '',
          url: `/projects/${this.data.project_id}/tasks/${this.data.id}`
        }
      ]);
    } else {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: this.project.name,
          url: `/projects/${this.data.project_id}/matrix`
        },
        {
          label: this.discipline ? `${this.discipline.category} ${this.design_stage.category}` : '',
          url: `/projects/${this.data.project_id}/tasks/${this.data.id}`
        }
      ]);
    }
    
  }

  goBack() {
    this.router.navigate(['/projects', this.data.project_id, 'matrix']);
  }
}
