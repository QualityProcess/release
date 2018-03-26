import { Component, OnInit, OnDestroy, Input, ViewChildren, QueryList } from '@angular/core';
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

import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'config-task', 
  templateUrl: './config-task.component.html',
  styleUrls: ['./config-task.component.scss']
})
export class ConfigTaskComponent implements OnInit, OnDestroy {

  dataSource: any;
  loaded = false;
  subscribe: any;
  onValueChangedSubscribe: any;
  deleteItemSubcribe: any;
  deleteActivitySubcribe: any
  onDateChangedSubscribe: any;
  selectedItem: any;
  taskActivityItems: TaskActivityItem[];

  constructor(private service: TaskService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  addActivity(phaseId) {
    console.log('phaseId: ', phaseId);
    let defaultActivity = new TaskActivity();
    defaultActivity.name = 'New Section';
    defaultActivity.task_phase_id = phaseId;
    defaultActivity.is_enabled = true;

    this.service.addTaskActivity(defaultActivity).subscribe(res => {
      console.log(res);
      this.addItem(res);
    });
  }

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

  ngOnInit() {
    this.updateData();
  }

  updateData() {

    if (this.subscribe) console.log(this.subscribe.unsubscribe());

    let data = this.route.snapshot.data.taskData;


    let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

    this.subscribe = response$.subscribe(result => {
      data.task_phases.forEach((taksPhase, index, taskPhases) => {

        taskPhases[index].task_activities = result[0].filter(item => {
          return item.task_phase_id == taskPhases[index].id;
        });

        taskPhases[index].task_activities.forEach((task_activity, i, task_activities) => {
          task_activities[i].task_activity_items = result[1].filter(item => {
            return item.task_activity_id == task_activities[i].id;
          });
        });

      });

      this.loaded = true;
    })
    
    this.dataSource = data.task_phases;
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();
    if (this.subscribe) this.subscribe.unsubscribe();
    if (this.deleteItemSubcribe) this.deleteItemSubcribe.unsubscribe();
    if (this.deleteActivitySubcribe) this.deleteActivitySubcribe.unsubscribe();
    if (this.onDateChangedSubscribe) this.onDateChangedSubscribe.unsubscribe();
  }

  onValueChanged(event) {
    let data = new TaskActivityItem();
    data = event.data;
    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem(event.data, +event.data.id).subscribe(res => { });
  }

  onQAValueChanged(e, item) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ is_locked: e.checked }, +item.id).subscribe(res => { });
  }

  onEnableValueChanged(e, item) {
    console.log('sDFFDS: ', e);
    console.log('sDFFDS: ', item);
    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ is_enabled: e.checked }, +item.id).subscribe(res => { });

  }

  changePercentage(percentage, activity, item) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();
    if (percentage >= 100) return;

    let phaseIndex;
    let activityIndex;
    let itemIndex;

    let phase = this.dataSource.find((phase, index) => {
      if (+phase.id === +activity.task_phase_id) phaseIndex = index; 
      return +phase.id === +activity.task_phase_id;
    });
    let taskActivity = phase.task_activities.find((act, index) => {
      if (+activity.id === +act.id) activityIndex = index; 
      return +activity.id === +act.id
    });

    let value = taskActivity.task_activity_items.find((i, index) => {
      if (+item.id === +i.id) itemIndex = index;
      return +item.id === +i.id
    });

    this.dataSource[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex].percentage_complete = percentage;
   
    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ percentage_complete: percentage}, +item.id).subscribe(res => { });
  }

  onDateChanged(event, item) {
    item.checked_on = event;

    this.onDateChangedSubscribe = this.service.updateTaskActivityItem(item, +item.id).subscribe(res => {
    });
   
  }

  openDeleteTaskActivityItemDialog(item) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: item,
        title: `Delete item ${item.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(item);
      }
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

  delete(item: TaskActivityItem) {
    this.deleteItemSubcribe = this.service.deleteTaskActivityItem(item.id).subscribe(res => {
      this.updateData();
    });
  }

  deleteActivity(activity: TaskActivity) {
    let phaseIndex;
    let activityIndex;
    let itemIndex;

    let phase = this.dataSource.find((phase, index) => {
      if (+phase.id === +activity.task_phase_id) phaseIndex = index;
      return +phase.id === +activity.task_phase_id;
    });
    let taskActivity = phase.task_activities.find((act, index) => {
      if (+activity.id === +act.id) activityIndex = index;
      return +activity.id === +act.id
    });

    this.dataSource[phaseIndex].task_activities.splice(activityIndex, 1);


    this.deleteActivitySubcribe = this.service.deleteTaskActivity(activity.id).subscribe(res => {
      this.updateData();
    });
  }

  formatDate(date): string {
    let dateObj = new Date(date),
      locale = "en-us";

    let month = dateObj.toLocaleString(locale, { month: "long" });
    return `${dateObj.getDay()} ${month}`;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
