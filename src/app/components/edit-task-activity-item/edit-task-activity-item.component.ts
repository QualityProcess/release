import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { TaskActivityItem } from '../../models/task-activity-item';
import { TaskPhase } from '../../models/task-phase';

@Component({
  selector: 'app-edit-task-activity-item',
  templateUrl: './edit-task-activity-item.component.html',
  styleUrls: ['./edit-task-activity-item.component.scss']
})
export class EditTaskActivityItemComponent implements OnInit {

  taskActivityItem: TaskActivityItem;
  saveTaskActivityItem: boolean = false;
  taskPhases: TaskPhase[];
  taskId: number;
  private subscribe: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService) { }

  ngOnInit() {

    this.subscribe = this.route.params.subscribe(params => {
      let id = +params['task_activity_item_id'];

      if (params['taskId']) {
        this.taskId = +params['taskId'];
      }

      this.taskActivityItem = this.route.snapshot.data.taskActivityItemsData.find((taskActivityItem) => taskActivityItem.id === id);
    });
  }

  onSaveTaskActivityItem() {
    this.saveTaskActivityItem = !this.saveTaskActivityItem;
  }

}
