import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  loaded: boolean = false;
  editTask: boolean = true;
  googleKeepView: boolean = false;
  horizontalHistogramView: boolean = false;
  granttView: boolean = false;
  circleView: boolean = false;
  views: Object = { googleKeepView: true, horizontalHistogramView: false, granttView: false };
  data: Task;
  taskActivities: TaskActivity[];
  taskActivityItems: TaskActivityItem[];

  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute) {
    this.views['googleKeepView'] = true;
    this.views['horizontalHistogramView'] = false;
    this.views['granttView'] = false;
  }

  ngOnInit() {
    //this.data = this.route.snapshot.data.taskData;

    this.getTask();
  }

  getTask() {
    this.loaded = true;
    //this.data = mockData;

    this.data = this.route.snapshot.data.taskData;
   

    let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

    response$.subscribe(result => {
      this.data.task_phases.forEach((taksPhase, index, taskPhases) => {

        taskPhases[index].task_activities = result[0].filter(item => {
          return item.task_phase_id == taskPhases[index].id;
        });

        taskPhases[index].task_activities.forEach((task_activity, i, task_activities) => {
          task_activities[i].task_activity_items = result[1].filter(item => {
            return item.task_activity_id == task_activities[i].id;
          });
        });

      }) 
    }) 

    /*this.service.getTaskActivities().subscribe(taskActivities => {
      
    });

    this.service.getTaskActivityItems().subscribe(taskActivityItems => {
      this.taskActivityItems = taskActivityItems;
    });*/

    console.log(this.data);
  }

  goToView(view) {
    console.log(view);

    switch (view) {
      case 'editTask':
        this.googleKeepView = false;
        this.horizontalHistogramView = false;
        this.granttView = false;
        this.circleView = false;
        this.editTask = true;
        break;
      case 'googleKeep':
        this.googleKeepView = true;
        this.horizontalHistogramView = false;
        this.granttView = false;
        this.circleView = false;
        this.editTask = false;
        break;
      case 'horizontalHistogram':
        this.googleKeepView = false;
        this.horizontalHistogramView = true;
        this.granttView = false;
        this.circleView = false;
        this.editTask = false;
        break;
      case 'grantt':
        this.googleKeepView = false;
        this.horizontalHistogramView = false;
        this.granttView = true;
        this.circleView = false;
        this.editTask = false;
        break;
      case 'circle':
        this.googleKeepView = false;
        this.horizontalHistogramView = false;
        this.granttView = true;
        this.circleView = false;
        this.editTask = false;
        break;
      default:
        this.googleKeepView = false;
        this.horizontalHistogramView = false;
        this.granttView = false;
        this.editTask = true;
    }
  }
}


//let mockData = {"id":3,"area_id":3,"name":"Fire Concept","description":"Adding a task after exploring through the hierarchy from the project downwards through the new WIP Admin UI (data model still to be updated)","is_enabled":true,"created_at":"2018-02-10T21:32:00.000Z","updated_at":"2018-02-18T22:49:39.502Z","image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_phases":[{"id":5,"description":"Working through elements of the new WIP UI","is_enabled":true,"created_at":"2018-02-10T21:35:03.013Z","updated_at":"2018-02-18T22:26:05.878Z","task_id":3,"category":"Inputs","image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activities":[{"id":10,"name":"Standard","description":"testing...","is_enabled":true,"created_at":"2018-02-10T21:38:14.730Z","updated_at":"2018-02-18T22:24:52.865Z","task_phase_id":5,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[{"id":25,"task_activity_id":10,"name":"Project time schedule.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:38:37.451Z","updated_at":"2018-02-25T23:02:25.448Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Jone","sort":2,"estimated_start":null,"estimated_completion":null,"hours_estimated":11.5,"hours_actual":9},{"id":26,"task_activity_id":10,"name":"Fire Safety standard used in project (if applicable).","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:38:46.833Z","updated_at":"2018-02-25T23:02:25.453Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Tom","sort":3,"estimated_start":null,"estimated_completion":null,"hours_estimated":12.5,"hours_actual":12},{"id":27,"task_activity_id":10,"name":"Site constraints (if applicable).","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:38:57.899Z","updated_at":"2018-02-25T23:02:25.458Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"John","sort":4,"estimated_start":null,"estimated_completion":null,"hours_estimated":4.5,"hours_actual":3},{"id":28,"task_activity_id":10,"name":"Design guidelines from client/operator.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":true,"created_at":"2018-02-18T22:39:07.797Z","updated_at":"2018-02-25T23:02:25.464Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Tomas","sort":5,"estimated_start":null,"estimated_completion":null,"hours_estimated":6,"hours_actual":5.9},{"id":24,"task_activity_id":10,"name":"Architectural sketch, concept.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:38:26.157Z","updated_at":"2018-02-25T23:02:30.260Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"John","sort":1,"estimated_start":null,"estimated_completion":null,"hours_estimated":7.1,"hours_actual":4},{"id":13,"task_activity_id":10,"name":"Project summary, methodology and scope of work.","description":"testing...","customisation":"","checked_on":null,"link":"","is_enabled":true,"is_locked":false,"created_at":"2018-02-10T21:39:09.567Z","updated_at":"2018-03-08T21:11:33.159Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Tomy","sort":0,"estimated_start":null,"estimated_completion":null,"hours_estimated":13,"hours_actual":9}]}]},{"id":7,"description":"","is_enabled":false,"created_at":"2018-02-18T22:32:34.403Z","updated_at":"2018-02-18T22:32:34.403Z","task_id":3,"category":"Outputs","image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activities":[{"id":11,"name":"Drawings","description":"","is_enabled":false,"created_at":"2018-02-18T22:32:52.318Z","updated_at":"2018-02-18T22:32:52.318Z","task_phase_id":7,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[]},{"id":13,"name":"Concept Report","description":"","is_enabled":false,"created_at":"2018-02-18T22:34:59.608Z","updated_at":"2018-02-18T22:34:59.608Z","task_phase_id":7,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[{"id":14,"task_activity_id":13,"name":"Concept services brief","description":"to establish available system concepts and a broad report investigating available options and recommendations, and definition of system requirements, key assumptions and main plant space requirement. Include fire tank calc summary, and flow/time calcs.","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:35:13.061Z","updated_at":"2018-02-18T22:35:13.061Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"John","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":12.5,"hours_actual":11},{"id":15,"task_activity_id":13,"name":"Assist with Fire Engineering report, including proposed design standards.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:35:21.756Z","updated_at":"2018-02-18T22:35:21.756Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"John","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":14.5,"hours_actual":7}]},{"id":14,"name":"Specifications","description":"","is_enabled":false,"created_at":"2018-02-18T22:35:44.829Z","updated_at":"2018-02-18T22:35:44.829Z","task_phase_id":7,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[]},{"id":15,"name":"Cost Plans","description":"","is_enabled":false,"created_at":"2018-02-18T22:35:54.304Z","updated_at":"2018-02-18T22:35:54.304Z","task_phase_id":7,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[{"id":16,"task_activity_id":15,"name":"Cost plan Rev A (per m2)","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:36:04.385Z","updated_at":"2018-02-18T22:36:04.385Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Jone","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":2,"hours_actual":1.2}]},{"id":16,"name":"Schedules","description":"","is_enabled":false,"created_at":"2018-02-18T22:36:24.179Z","updated_at":"2018-02-18T22:36:24.179Z","task_phase_id":7,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[{"id":17,"task_activity_id":16,"name":"Area schedule","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:36:28.645Z","updated_at":"2018-02-18T22:36:28.645Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":7,"hours_actual":5},{"id":18,"task_activity_id":16,"name":"Concept Drawing schedule","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:36:42.539Z","updated_at":"2018-02-18T22:36:42.539Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"Ron","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":13.8,"hours_actual":10.5}]}]},{"id":6,"description":"","is_enabled":true,"created_at":"2018-02-18T22:32:25.664Z","updated_at":"2018-02-18T22:50:00.540Z","task_id":3,"category":"Design","image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activities":[{"id":12,"name":"Standard","description":"","is_enabled":false,"created_at":"2018-02-18T22:34:40.335Z","updated_at":"2018-02-18T22:34:40.335Z","task_phase_id":6,"image":{"url":null,"thumbnail":{"url":null}},"sort":null,"task_activity_items":[{"id":19,"task_activity_id":12,"name":"Review applicable Authority codes and Standard.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:37:21.037Z","updated_at":"2018-02-18T22:37:21.037Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":9,"hours_actual":8.5},{"id":20,"task_activity_id":12,"name":"Prepare system options for discussion.  ","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:37:30.594Z","updated_at":"2018-02-18T22:37:30.594Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":19,"hours_actual":15.5},{"id":21,"task_activity_id":12,"name":"Main tank volume and plant space requirements.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":true,"created_at":"2018-02-18T22:37:43.215Z","updated_at":"2018-02-18T22:37:43.215Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":12,"hours_actual":12},{"id":22,"task_activity_id":12,"name":"Investigate interface requirements with existing/ other buildings.","description":"","customisation":"","checked_on":null,"link":"","is_enabled":null,"is_locked":false,"created_at":"2018-02-18T22:37:52.625Z","updated_at":"2018-02-18T22:37:52.625Z","image":{"url":null,"thumbnail":{"url":null}},"checked_by":"John","sort":null,"estimated_start":null,"estimated_completion":null,"hours_estimated":14,"hours_actual":2}]}]}]}
