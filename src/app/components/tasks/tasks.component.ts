import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DeleteDialog } from "../dialogs/delete-dialog";
import { TaskService } from "../../services/task.service";
import { Task } from "../../models/task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  filterData: Task[];
  loaded: boolean = false;
  gridView: boolean = true;

  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.service.getTasks().subscribe(tasks => {
      this.loaded = true;
      this.tasks = tasks;
      this.filterData = tasks;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.tasks.filter((task) => {
      let regExp = new RegExp(filterValue.toString(), 'gi');
      return regExp.test(task.name.toString());
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

  openDeleteDialog(task){
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        taks: task,
        title: `Delete task ${task.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' ,result);
      if (result) {
        this.delete(task);
      }
    });
  }

  delete(deleteTask: Task) {
     this.service.deleteTask(deleteTask.id).subscribe();
     this.tasks = this.filterData.filter( (task: Task)=> {
       return task.id !== deleteTask.id;
     });
    this.filterData = this.filterData.filter( (task: Task)=> {
       return task.id !== deleteTask.id;
     });
  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
