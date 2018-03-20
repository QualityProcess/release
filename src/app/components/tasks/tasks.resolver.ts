import { Injectable, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectsService } from '../../services/projects.service';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class TasksResolver implements Resolve<any> {
  constructor(private service: TaskService, private projectService: ProjectsService, private router: Router) { }

  resolve() {

    return this.service.getTasks().catch(err => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/projects']); // could redirect to error page
        return empty<Task[]>();
    });

    
    
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      this.projectService.getProjects().subscribe( projects => {
        resolve(projects);
      })
    });
  }
}

