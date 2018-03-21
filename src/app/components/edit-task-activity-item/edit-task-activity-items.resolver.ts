import { Injectable, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskActivityItem } from '../../models/task-activity-item';
import { Observable } from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TaskActivityItemsResolver implements Resolve<any> {
  constructor(private service: TaskService, private router: Router) { }

  resolve() {

    return this.service.getTaskActivityItems().catch(err => {
      console.error(err); // deal with API error (eg not found)
      this.router.navigate(['/tasks']); // could redirect to error page
      return empty<TaskActivityItem[]>();
    });
  }

}

