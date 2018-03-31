// core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// frameworks
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

// dialogs
import { DeleteDialog } from "../../dialogs/delete-dialog";

// models
import { TaskPhase } from "../../../models/task-phase";
import { TaskActivity } from "../../../models/task-activity";
import { TaskActivityItem } from "../../../models/task-activity-item";

// services
import { TaskService } from "../../../services/task.service";

@Component({
  selector: 'activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {
  @Input('phase') phase: TaskPhase;
  @Input('activity') activity: TaskActivity;
  @Input('taskActivityItems') taskActivityItems: TaskActivityItem[];

  @Output() onUpdateData = new EventEmitter();

  onValueChangedSubscribe: any;
  onDateChangedSubscribe: any;
  deleteItemSubcribe: any;
  orderSubscribe: any;

  selectedItem: any;
  isSendOrderItem: boolean = false;
  isOverOrderItem: boolean = false;

  constructor(private service: TaskService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
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


/**
* Update data
*/
  updateData() {
    this.onUpdateData.emit();
  }

/**
* Update cell data through API
*
* @param {object} activity - PrimeNg onEditComplete event object
*/
  onValueChanged(event) {
    let data = new TaskActivityItem();
    data = event.data;
    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem(event.data, +event.data.id).subscribe(res => { });
  }

/**
* Update QA checkbox cell data through API
*
* @param {object} e - (change) event object when the checkbox's checked value changes.- https://material.angular.io/components/checkbox/api
* @param {TaskActivityItem} item - task activity item
*/
  onQAValueChanged(e: any, item: TaskActivityItem) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ is_locked: e.checked }, +item.id).subscribe(res => { });
  }

/**
* Update enable checkbox cell data through API
*
* @param {object} e - (change) event object when the checkbox's checked value changes.- https://material.angular.io/components/checkbox/api
* @param {TaskActivityItem} item - task activity item
*/
  onEnableValueChanged(e, item) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ is_enabled: e.checked }, +item.id).subscribe(res => { });

  }

/**
* Update precentage cell data through API
*
* @param {TaskActivity} activity - task activity object
* @param {TaskActivityItem} item - task activity item object
*/
  changePercentage(activity, item) {

    if (this.onValueChangedSubscribe) this.onValueChangedSubscribe.unsubscribe();

    let currentItem = this.taskActivityItems.find((elem, index, array) => {

      if (+item.id === +elem.id) {
        if (item.percentage_complete >= 100) {
          array[index].percentage_complete = 0;
        } else {
          array[index].percentage_complete = array[index].percentage_complete + 20;
        }
      }

      return +item.id === +elem.id
    });

    this.onValueChangedSubscribe = this.service.updateTaskActivityItem({ percentage_complete: currentItem.percentage_complete }, +item.id).subscribe(res => { });
  }

/**
* Update date cell data through API
*
* @param {TaskActivity} activity - PrimeNg p-calendar event object 'onSelect' - https://www.primefaces.org/primeng/#/calendar
* @param {TaskActivityItem} item - task activity item object
*/
  onDateChanged(event, item) {
    item.checked_on = event;

    this.onDateChangedSubscribe = this.service.updateTaskActivityItem(item, +item.id).subscribe(res => {
    });
  }

/**
* Confirm delete dialog - see https://material.angular.io/components/dialog/api
*
* @param {TaskActivityItem} item - task activity item object
*/
  openDeleteTaskActivityItemDialog(item: TaskActivityItem) {
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

/**
* delete task activity item
*
* @param {TaskActivityItem} item - task activity item object
*/
  delete(item: TaskActivityItem) {
    this.deleteItemSubcribe = this.service.deleteTaskActivityItem(item.id).subscribe(res => {
      this.updateData();
    });
  }

/**
* Drop TAI event 
*
* @param {Array} event
*   0 - [phase id, activity id]
*   1 - HTMLElement
*/
  onDropItem(event) {
    console.log(event[0][1]);  
    // if task_activity_item drag and drop
    if (event[1].tagName === 'TR' && event[1].parentElement) {
        let isCurrentSectionHandle = this.taskActivityItems.find(elem => elem.task_activity_id === event[0][1]);

        if (isCurrentSectionHandle) {
          let requestData = {
            task_activity_item: [],
            task_activity_id: this.taskActivityItems[0].task_activity_id
          };
          this.taskActivityItems.forEach((el, index: number) => {
            requestData.task_activity_item.push(el.id);
          });

          console.log('Drop Item', requestData.task_activity_id);
          this.orderSubscribe = this.service.updateTaskActivityItemOrder(requestData).subscribe();
          event[1].parentElement.lastElementChild.style.display = 'table-row';
        }
    }
  }

/** 
* Over TAI event 
*
* @param {Array} event
*   0 - [phase id, activity id]
*   1 - HTMLElement
*/
  ngOnOverItem(event) {

    // if task_activity_item drag and drop
    if (event[1].tagName === 'TR') {
        event[1].parentElement.lastElementChild.style.display = 'none';
    }
  }

}