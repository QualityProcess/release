import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";
import { Task } from "../../models/task";
import { Discipline } from "../../models/discipline";
import { DesignStage } from "../../models/design-stage";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";
import { Location } from '@angular/common';

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
  discipline: string;
  design_stage: string;
  taskActivities: TaskActivity[];
  taskActivityItems: TaskActivityItem[];

  constructor(private service: TaskService,
    private projectService: ProjectsService,
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
   
    /*
    let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

    response$.subscribe(result => {

      this.data.task_phases.sort(function (a, b) {
        return a.sort - b.sort;
      });

      this.data.task_phases.forEach((taksPhase, index, taskPhases) => {

        taskPhases[index].task_activities = result[0].filter(item => {
          return item.task_phase_id == taskPhases[index].id;
        });

        taskPhases[index].task_activities.sort(function (a, b) {
          return a.sort - b.sort;
        });

        taskPhases[index].task_activities.forEach((task_activity, i, task_activities) => {
          task_activities[i].task_activity_items = result[1].filter(item => {
            return item.task_activity_id == task_activities[i].id;
          });

          task_activities[i].task_activity_items = task_activities[i].task_activity_items.sort(function (a, b) {
            return a.sort - b.sort;
          });

        });

      })
    });
    */

    this.setBreadCrumbs();

    this.projectService.getDescipline(this.data.discipline_id).subscribe(discipline => {
      this.discipline = discipline.category;
      console.log(discipline);
    });

    this.projectService.getDesignStage(this.data.design_stage_id).subscribe(design_stage => {
      this.design_stage = design_stage.category;
      console.log(design_stage);
    });

  }

  setBreadCrumbs() {
    this.breadCrumbsService.setBreadcrumbs([
      {
        label: 'Projects',
        url: '/projects'
      },
      {
        label: 'Matrix',
        url: `/projects/${this.data.project_id}/matrix`
      },
      {
        label: this.data.name,
        url: `/projects/${this.data.project_id}/tasks/${this.data.id}`
      }
    ]);
  }

  goBack() {
    this._location.back();
  }
}
