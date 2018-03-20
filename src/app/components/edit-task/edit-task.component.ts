import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { Discipline } from '../../models/discipline';
import { DesignStage } from '../../models/design-stage';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task;
  projects: Project[];
  disciplines: Discipline[];
  designStages: DesignStage[];
  saveTask: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService) { }

  ngOnInit() {
    this.task = this.route.snapshot.data.taskData;
    this.projects = this.route.snapshot.data.projectsData;
    this.disciplines = this.route.snapshot.data.disciplinesData;
    this.designStages = this.route.snapshot.data.designStagesData;
  }

  onSaveTask() {
    this.saveTask = !this.saveTask;
  }

}
