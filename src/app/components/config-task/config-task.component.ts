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
  @Input() rows;
  subscribe: any;
  onValueChangedSubscribe: any;
  deleteItemSubcribe: any;
  orderSubscribe: any;
  deleteActivitySubcribe: any
  onDateChangedSubscribe: any;
  selectedItem: any;
  isSendOrderItem: boolean = false;
  isOverOrderItem: boolean = false;
  taskActivityItems: TaskActivityItem[];

  constructor(private service: TaskService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  addActivity(phaseId) {
    let defaultActivity = new TaskActivity();
    defaultActivity.name = 'New Section';
    defaultActivity.task_phase_id = phaseId;
    defaultActivity.is_enabled = true;

    this.service.addTaskActivity(defaultActivity).subscribe(res => {
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

  onDropItem(event) {
    if (!this.isSendOrderItem) {

      event[1].parentElement.lastElementChild.style.display = 'table-row';

      let phase = this.dataSource.find(phase => phase.id === event[0][0]);
      let activity = phase.task_activities.find(activity => activity.id === event[0][1]);
      let requestData = {
        task_activity_item: [],
        task_activity_id: activity.id
      }; 
      activity.task_activity_items.forEach((el, index: number) => {
        requestData.task_activity_item.push(el.id);
      });

      this.orderSubscribe = this.service.updateTaskActivityItemOrder(requestData).subscribe(); 
      this.isSendOrderItem = true;
    } else {
      setTimeout(() => { this.isSendOrderItem = false }, 500);
    }
    
  }

  ngOnOverItem(event) {
    if (!this.isOverOrderItem) {
      event[1].parentElement.lastElementChild.style.display = 'none';
      this.isOverOrderItem = true;
    } else {
      setTimeout(() => { this.isOverOrderItem = false }, 500);
    }
  }

  updateData() {

    if (this.subscribe) this.subscribe.unsubscribe();

    let data = this.route.snapshot.data.taskData;


    let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

    this.subscribe = response$.subscribe(result => {

      data.task_phases.sort(function (a, b) {
        return a.sort - b.sort;
      });

      data.task_phases.forEach((taksPhase, index, taskPhases) => {

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

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ is_enabled: e.checked }, +item.id).subscribe(res => { });

  }

  changePercentage(activity, item) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

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

    let itemData = this.dataSource[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex];

    if (itemData.percentage_complete >= 100) {
      itemData.percentage_complete = 0;
    } else {
      itemData.percentage_complete = itemData.percentage_complete + 20;
    }
   
    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ percentage_complete: itemData.percentage_complete}, +item.id).subscribe(res => { });
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
