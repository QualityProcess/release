import { Injectable, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskActivity } from '../../models/task-activity';
import { Observable } from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TaskActivityResolver implements Resolve<any> {
  constructor(private service: TaskService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getTaskActivity(+route.paramMap.get('id'))
      .catch(err => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/tasks']); // could redirect to error page
        return empty<TaskActivity>();
      });
  }
}
