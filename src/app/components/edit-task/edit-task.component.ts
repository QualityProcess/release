import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task;
  saveTask: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService) { }

  ngOnInit() {
    this.task = this.route.snapshot.data.taskData;
  }

  onSaveTask() {
    this.saveTask = !this.saveTask;
  }

}
