import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { TaskActivity } from '../../models/task-activity';
import { TaskPhase } from '../../models/task-phase';

@Component({
  selector: 'app-edit-task-activity',
  templateUrl: './edit-task-activity.component.html',
  styleUrls: ['./edit-task-activity.component.scss']
})
export class EditTaskActivityComponent implements OnInit {
  taskActivity: TaskActivity;
  saveTaskActivity: boolean = false;
  taskPhases: TaskPhase[];
  taskId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService) { }

  ngOnInit() {
    this.taskActivity = this.route.snapshot.data.taskActivityData;

    this.route.params.subscribe(params => {
      if (params['taskId']) {
        this.taskId = +params['taskId'];
      }
    });

    
  }

  onSaveTaskActivity() {
    this.saveTaskActivity = !this.saveTaskActivity;
  }

}
