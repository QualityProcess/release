
// core
import { Component, OnInit, OnDestroy, Input, ViewChildren, QueryList } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

// models
import { Task } from "../../models/task";
import { TaskPhase } from "../../models/task-phase";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

// libraries
import { MatTableDataSource } from '@angular/material';
import { DragulaService } from 'ng2-dragula';
import * as XLSX from 'xlsx';

// services
import { UserService } from './../../services/user.service';
import { TaskService } from "../../services/task.service";
import { NavBarService } from "../../services/nav-bar.service";

// rxjs
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/Rx';

@Component({
  selector: 'config-task', 
  templateUrl: './config-task.component.html',
  styleUrls: ['./config-task.component.scss']
})
export class ConfigTaskComponent implements OnInit, OnDestroy {

  task: Task;
  phases: TaskPhase[];
  taskActivities: TaskActivity[] = [];
  taskActivityItems: TaskActivityItem[] = [];

  loaded = false;
  subscribe: any;
  orderSubscribe: any;
  deleteActivitySubcribe: any;
  private exportData: any;
  private exportHeaders = ['Name', 'Is checked', '%', 'Estimated hours', 'Actual hours', 'Start date', 'End date', 'Checked by', 'Checked date', 'QA', 'QA by', 'QA date', 'Link', 'Note'];
  private exportFields = ['name', 'is_enabled', 'percentage_complete', 'hours_estimated', 'hours_actual', 'estimated_start', 'estimated_completion', 'checked_by', 'checked_on', 'is_locked', 'qa_by', 'qa_date', 'link', 'customisation'];

  constructor(
 private service: TaskService,
 private userService: UserService,
 private navBarService: NavBarService,
 public dialog: MatDialog,
 private router: Router,
 private route: ActivatedRoute,
 private dragulaService: DragulaService) {
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  ngOnInit() {
    this.updateData();
    this.navBarService.downloadTaskToExel.subscribe(() => {
      this.exportToExel();
    });
  }


 /**
 * Update all data in arrays .
 *
 */
  updateData() {

    if (this.subscribe) this.subscribe.unsubscribe();

    let data = this.route.snapshot.data.taskData;
    this.task = data;

    // get phases
    this.phases = data.task_phases.sort(function (a, b) {
      return a.sort - b.sort;
    });

    let phaseIds = this.phases.map(phase => phase.id);

    if (phaseIds.length === 0) this.loaded = true;
    
    let allActivitiesByPhasesSubcribe = this.getAllActivitiesByPhases(phaseIds).subscribe(res => {
      this.taskActivities = [];
      this.taskActivities = this.taskActivities.concat(...res);

      if (this.taskActivities.length === 0) this.loaded = true;

      this.taskActivities.sort(function (a, b) {
        return a.sort - b.sort;
      });

      let activityIds = this.taskActivities.map(activity => activity.id);

      this.getAllActivityItemsByActivities(activityIds).subscribe(res => {
        this.taskActivityItems = [];
        this.taskActivityItems = this.taskActivityItems.concat(...res);

        this.taskActivityItems.sort(function (a, b) {
          return a.sort - b.sort;
        });

        this.taskActivityItems.forEach((item, index, array) => {

          if (array[index].is_locked) {
            array[index].can_checked_qa = true;
          } else if (this.userService.userInfo.userName && array[index].checked_by === this.userService.userInfo.userName) {
            array[index].can_checked_qa = false;
          } else {
            array[index].can_checked_qa = item.is_enabled;
          }
          
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
    defaultActivity.is_enabled = false; 

    this.taskActivities.push(defaultActivity);
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
    //this.taskActivityItems.push(defaultItem);
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

    /*this.deleteActivitySubcribe = this.service.deleteTaskActivity(activity.id).subscribe(res => {
      this.updateData();
    });*/
  }

  /**
   * export data to exel using xlsx - https://www.npmjs.com/package/xlsx
   */
  private export() {

    let getTaskActivityNameById = (task_activity_id: number): string => {
      let activity = this.taskActivities.find(activity => activity.id === task_activity_id);

      return activity.name;
    };

    let getPhaseNameById = (phaseId: number): string => {
      let phase = this.phases.find(phase => phase.id === phaseId);

      return phase.name;
    };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    this.exportData.forEach((phase, phaseIndex) => {

      /* worksheet */
      let ws: XLSX.WorkSheet;
      let output = [];

      output.push([""].concat(this.exportHeaders));

      phase.task_activities.forEach((acitivity, index, array) => {
        
        output.push([acitivity.name]);
        
        acitivity.task_activity_items.forEach((item, index, array) => {

          let outputFiels = [];
          outputFiels.push("");
          this.exportFields.forEach( field => {
            if (item.hasOwnProperty(field)) {
              let cell;
              if (field === 'estimated_start' || field === 'estimated_completion' || field === 'checked_on' || field === 'qa_date') {
                if (new Date(item[field]) > new Date(2000, 10, 10)) {
                  cell = new Date(item[field]);
                } else {
                  cell = "";
                }
              } else {
                cell = item[field];
              }
              outputFiels.push(cell);
            };
          })

          output.push(outputFiels)
        });
      });

      ws = XLSX.utils.aoa_to_sheet(output);
      XLSX.utils.book_append_sheet(wb, ws, phase.category);
    })

    /* save to file */
    XLSX.writeFile(wb, `${this.task.name}.xlsx`);
    
  }

  exportToExel() {

    this.service.getTask(this.task.id).subscribe(res => {
        this.exportData = res;

        let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

        response$.subscribe(result => {

          this.exportData.task_phases.sort(function (a, b) {
            return a.sort - b.sort;
          });

          this.exportData.task_phases.forEach((taksPhase, index, taskPhases) => {

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

          });

          this.exportData = this.exportData.task_phases;

          this.export();
        });
      });
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
