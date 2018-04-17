// core
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// models
import { Project } from '../../models/project';
import { Discipline } from '../../models/discipline';
import { DesignStage } from '../../models/design-stage';
import { Task } from '../../models/task';
import { TaskActivity } from '../../models/task-activity';
import { TaskPhase } from '../../models/task-phase';

// services
import { UserService } from './../../services/user.service';
import { ProjectsService } from '../../services/projects.service';
import { TaskService } from '../../services/task.service';

// rxjs
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/switchMap';

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

@Component({
  selector: 'app-edit-task-activity',
  templateUrl: './edit-task-activity.component.html',
  styleUrls: ['./edit-task-activity.component.scss']
})
export class EditTaskActivityComponent implements OnInit {
  taskActivity: TaskActivity;
  saveTaskActivity: boolean = false;
  task: Task;
  project: Project;
  design_stage: DesignStage;
  discipline: Discipline;
  taskPhases: TaskPhase[];
  taskId: number;
  breadcrumbs: BreadCrumb[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService,
    private userService: UserService,
    private projectService: ProjectsService,
    private breadCrumbsService: BreadCrumbsService
  ) { }

  ngOnInit() {
    this.taskActivity = this.route.snapshot.data.taskActivityData;
    this.task = this.route.snapshot.data.taskData;
    this.project = this.route.snapshot.data.projectData;

    this.route.params.subscribe(params => {
      if (params['taskId']) {
        this.taskId = +params['taskId'];
      }
    });

    let getDisciplineAndDesignStageToTheTask$ = forkJoin(this.projectService.getDescipline(this.task.discipline_id), this.projectService.getDesignStage(this.task.design_stage_id));

    getDisciplineAndDesignStageToTheTask$.subscribe(result => {
      this.discipline = result[0];
      this.design_stage = result[1];
      this.setBreadCrumbs();
    });

    this.setBreadCrumbs();
  }

  onSaveTaskActivity() {
    this.saveTaskActivity = !this.saveTaskActivity;
  }

  setBreadCrumbs() {

    if (this.userService.isAdmin) {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: 'Projects',
          url: '/projects'
        },
        {
          label: this.project.name,
          url: `/projects/${this.project.id}/matrix`
        },
        {
          label: this.discipline ? `${this.discipline.category} ${this.design_stage.category}` : '',
          url: `/projects/${this.project.id}/tasks/${this.task.id}`
        },
        {
          label: this.taskActivity.name != "" ? this.taskActivity.name : 'edit',
          url: `/projects/${this.project.id}/tasks/${this.task.id}/task-activities/${this.taskActivity.id}/edit`
        }
      ]);
    } else {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: this.project.name,
          url: `/projects/${this.project.id}/matrix`
        },
        {
          label: this.discipline ? `${this.discipline.category} ${this.design_stage.category}` : '',
          url: `/projects/${this.project.id}/tasks/${this.task.id}`
        },
        {
          label: this.taskActivity.name != "" ? this.taskActivity.name : 'edit',
          url: `/projects/${this.project.id}/tasks/${this.task.id}/task-activities/${this.taskActivity.id}/edit`
        }
      ]);
    }
    
  }

}
