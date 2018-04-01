import { Injectable, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable } from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TaskResolver implements Resolve<any> {
  constructor(private service: TaskService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(+route.paramMap.get('task_id'));
    console.log(route.paramMap); 
    return this.service.getTask(+route.paramMap.get('task_id'))
      .catch(err => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/projects']); // could redirect to error page
        return empty<Task>();
      });
  }
}
