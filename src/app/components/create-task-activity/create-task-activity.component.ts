import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Task } from '../../models/task';
import { TaskPhase } from '../../models/task-phase';

@Component({
  selector: 'app-create-task-activity',
  templateUrl: './create-task-activity.component.html',
  styleUrls: ['./create-task-activity.component.scss']
})
export class CreateTaskActivityComponent implements OnInit {
  saveTaskActivity: boolean = false;
  task: Task;
  taskPhases: TaskPhase[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.task = this.route.snapshot.data.taskData;
    this.taskPhases = this.task.task_phases;
    console.log(this.task);
  }

  onSaveTaskActivity() {
    this.saveTaskActivity = !this.saveTaskActivity;
  }

}
