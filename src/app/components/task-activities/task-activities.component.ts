import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DeleteDialog } from "../dialogs/delete-dialog";
import { TaskService } from "../../services/task.service";
import { TaskActivity } from "../../models/task-activity";
@Component({
  selector: 'app-task-activities',
  templateUrl: './task-activities.component.html',
  styleUrls: ['./task-activities.component.scss']
})
export class TaskActivitiesComponent implements OnInit {
  taskActivities: TaskActivity[];
  filterData: TaskActivity[];
  loaded: boolean = false;
  gridView: boolean = true;

  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTaskActivities();
  }

  getTaskActivities() {
    this.service.getTaskActivities().subscribe(taskActivities => {
      this.loaded = true;
      this.taskActivities = taskActivities;
      this.filterData = taskActivities;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.taskActivities.filter((taskActivitiy) => {
      let regExp = new RegExp(filterValue.toString(), 'gi');
      return regExp.test(taskActivitiy.name.toString());
    });
  }

  sortData(name) {
    name = name.srcElement.value;
    console.log(name);
    const data = this.filterData.slice();


    this.filterData = data.sort((a, b) => {
      let isAsc = 'asc';
      switch (name) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc)
        default: return 0;
      }
    });
  }

  formatDate(date): string {
    let dateObj = new Date(date);
    return `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  }

  toogleView(view) {
    this.gridView = view === 'list' ? false : true;
  }

  openDeleteDialog(taskActivity){
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        taskActivity: taskActivity,
        title: `Delete task activity ${taskActivity.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' ,result);
      if (result) {
        this.delete(taskActivity);
      }
    });
  }

  delete(deleteTaskActivity: TaskActivity) {
     this.service.deleteTask(deleteTaskActivity.id).subscribe();
     this.taskActivities = this.filterData.filter( (taskActivity: TaskActivity)=> {
       return taskActivity.id !== deleteTaskActivity.id;
     });
    this.filterData = this.filterData.filter( (taskActivity: TaskActivity)=> {
       return taskActivity.id !== deleteTaskActivity.id;
     });
  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
