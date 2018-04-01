import { Component, OnInit, OnDestroy, Input, ViewChildren, QueryList } from '@angular/core';

import { TaskPhase } from "../../models/task-phase";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";
import { TaskService } from "../../services/task.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { DragulaService } from 'ng2-dragula';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'config-task', 
  templateUrl: './config-task.component.html',
  styleUrls: ['./config-task.component.scss']
})
export class ConfigTaskComponent implements OnInit, OnDestroy {

  phases: TaskPhase[];
  taskActivities: TaskActivity[] = [];
  taskActivityItems: TaskActivityItem[] = [];

  loaded = false;
  subscribe: any;
  orderSubscribe: any;
  deleteActivitySubcribe: any

  constructor(private service: TaskService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private dragulaService: DragulaService) {
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  ngOnInit() {
    this.updateData();
  }


 /**
 * Update all data in arrays .
 *
 */
  updateData() {

    if (this.subscribe) this.subscribe.unsubscribe();

    let data = this.route.snapshot.data.taskData;

    // get phases
    this.phases = data.task_phases.sort(function (a, b) {
      return a.sort - b.sort;
    });

    let phaseIds = this.phases.map(phase => phase.id);

    if (phaseIds.length === 0) this.loaded = true;
    
    let allActivitiesByPhasesSubcribe = this.getAllActivitiesByPhases(phaseIds).subscribe(res => {
      this.taskActivities = this.taskActivities.concat(...res);

      if (this.taskActivities.length === 0) this.loaded = true;

      this.taskActivityItems.sort(function (a, b) {
        return a.sort - b.sort;
      });



      let activityIds = this.taskActivities.map(activity => activity.id);

      this.getAllActivityItemsByActivities(activityIds).subscribe(res => {
        this.taskActivityItems = this.taskActivityItems.concat(...res);

        this.taskActivityItems.sort(function (a, b) {
          return a.sort - b.sort;
        });

        // load data completed
        this.loaded = true;
      });

    });

   

    // request for get activities and items
    /*let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

    this.subscribe = response$.subscribe(result => {

      // get activities
      this.taskActivities = result[0];

      // get items
      this.taskActivityItems = result[1].sort(function (a, b) {
        return a.sort - b.sort;
      });

      console.log("taskActivities: ", this.taskActivities);
      console.log("taskActivityItems: ", this.taskActivityItems);
      // load data completed
      this.loaded = true;
    })*/ 
  }

  getAllActivitiesByPhases(phaseIds: number[]) {
    let activitiesObservable: Observable<TaskActivity[]>[] = [];
    phaseIds.forEach(id => {
      activitiesObservable.push(this.service.getTaskActivitiesByPhase(+id));
    });

    return forkJoin(...activitiesObservable);
  }

  getAllActivityItemsByActivities(activityIds: number[]) {
    let activityItemsObservable: Observable<TaskActivityItem[]>[] = [];
    activityIds.forEach(id => {
      activityItemsObservable.push(this.service.getTaskActivityItemsByActivity(+id));
    });

    return forkJoin(...activityItemsObservable);
  }


  /**
 * Returns task activities to phase.
 *
 * @param {number} phaseId - task phase id
 */
  getTaskActivitiesToPhase(phaseId) {
    let result = this.taskActivities.filter(taskActivity => taskActivity.task_phase_id === phaseId);

    result.sort(function (a, b) {
      return a.sort - b.sort;
    });

    return result;
  }

  /**
  * Returns task activity item to activity.
  *
  * @param {number} activityId - task phase id
  */
  getTaskActivityItemsToActivity(activityId) {
    let result = this.taskActivityItems.filter(taskActivityItem => taskActivityItem.task_activity_id === activityId);

    result.sort(function (a, b) {
      return a.sort - b.sort;
    });

    return result;
  }


/**
* Add new default activity
*
* @param {number} phaseId - task phase id
*/
  addActivity(phaseId) {
    let defaultActivity = new TaskActivity();
    defaultActivity.name = 'New Section';
    defaultActivity.task_phase_id = phaseId;
    defaultActivity.is_enabled = true;

    this.service.addTaskActivity(defaultActivity).subscribe(res => {
      this.addItem(res);
    });
  }

  /**
* Add new default activity item
*
* @param {object} activity - task activity object
*/
  addItem(activity: TaskActivity) {

    let defaultItem = new TaskActivityItem();
    defaultItem.name = 'New item';
    defaultItem.task_activity_id = activity.id;
    defaultItem.hours_estimated = 0;
    defaultItem.hours_actual = 0;
    defaultItem.is_enabled = true;

    this.service.addTaskActivityItem(defaultItem).subscribe((e) => {
      this.updateData();
    });
  }

  openDeleteTaskActivityDialog(item) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: item,
        title: `Delete ${item.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteActivity(item);
      }
    });
  }

  /**
* Drop Section event 
*
* @param {Array} event
*   0 - [phase id, activity id]
*   1 - HTMLElement
*/
  onDrop(event) {
    const [element, sectionBag, el] = event;

    const draggableActivityId: number = +element.dataset.activity_id;
    const dragToPhaseId: number = +sectionBag.dataset.phase_id;

    this.taskActivities.find((activity, index) => {

      if (activity.id === draggableActivityId && activity.task_phase_id !== dragToPhaseId) {
        activity.task_phase_id = dragToPhaseId;
        this.service.updateTaskActivity({ task_phase_id: dragToPhaseId } as TaskActivity, activity.id).subscribe();
      }
      return activity.id === +element.dataset.activity_id;
    });
  }

  handleActivity(el, container, handle) {
    return handle.classList.contains('handle-acivity');
  }


  deleteActivity(activity: TaskActivity) {

    let taskActivity = this.taskActivities.find((act, index, array) => {
      if (+activity.id === +act.id) {
        array.splice(index, 1);
      }
      return +activity.id === +act.id
    });

    console.log('DELETE ACTIVITY');

    /*this.deleteActivitySubcribe = this.service.deleteTaskActivity(activity.id).subscribe(res => {
      this.updateData();
    });*/
  }

  formatDate(date): string {
    let dateObj = new Date(date),
      locale = "en-us";

    let month = dateObj.toLocaleString(locale, { month: "long" });
    return `${dateObj.getDay()} ${month}`;
  }

 /**
 * Implement OnDestroy interface
 */
  ngOnDestroy() {

  }

}
