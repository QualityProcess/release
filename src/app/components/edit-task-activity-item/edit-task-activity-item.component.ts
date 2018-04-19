// core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/switchMap';

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

// models
import { Project } from '../../models/project';
import { Discipline } from '../../models/discipline';
import { DesignStage } from '../../models/design-stage';
import { Task } from '../../models/task';
import { TaskPhase } from '../../models/task-phase';
import { TaskActivityItem } from '../../models/task-activity-item';

// services
import { ProjectsService } from '../../services/projects.service';
import { TaskService } from '../../services/task.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-edit-task-activity-item',
  templateUrl: './edit-task-activity-item.component.html',
  styleUrls: ['./edit-task-activity-item.component.scss']
})
export class EditTaskActivityItemComponent implements OnInit {

  taskActivityItem: TaskActivityItem;
  saveTaskActivityItem: boolean = false;
  taskPhases: TaskPhase[];
  public project: Project;
  public discipline: Discipline;
  public design_stage: DesignStage;
  public task: Task;
  taskId: number;
  private subscribe: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService,
    private projectService: ProjectsService,
    private userService: UserService,
    private breadCrumbsService: BreadCrumbsService
  ) { }

  ngOnInit() {

    this.task = this.route.snapshot.data.taskData;
    this.project = this.route.snapshot.data.projectData;

 

    this.subscribe = this.route.params.subscribe(params => {
      let id = +params['task_activity_item_id'];

      if (params['taskId']) {
        this.taskId = +params['taskId'];
      }

      this.taskActivityItem = this.route.snapshot.data.taskActivityItemsData.find((taskActivityItem) => taskActivityItem.id === id);
    });

    let getDisciplineAndDesignStageToTheTask$ = forkJoin(this.projectService.getDescipline(this.task.discipline_id), this.projectService.getDesignStage(this.task.design_stage_id));

    getDisciplineAndDesignStageToTheTask$.subscribe(result => {
      this.discipline = result[0];
      this.design_stage = result[1];
      this.setBreadCrumbs();
    });
  }

  onSaveTaskActivityItem() {
    this.saveTaskActivityItem = !this.saveTaskActivityItem;
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
          label: this.task.name,
          url: `task-activity-items/${this.taskActivityItem.id}/edit`
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
          label: this.task.name,
          url: `task-activity-items/${this.taskActivityItem.id}/edit`
        }
      ]);
    }
    
  }

}
