import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { TaskActivityItem } from '../../models/task-activity-item';
import { TaskPhase } from '../../models/task-phase';


@Component({
  selector: 'app-create-task-activity-item',
  templateUrl: './create-task-activity-item.component.html',
  styleUrls: ['./create-task-activity-item.component.scss']
})
export class CreateTaskActivityItemComponent implements OnInit {
  saveTaskActivityItem: boolean = false;
  taskActivityId: number;
  taskId: number;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(({ id }) => {
      this.taskActivityId = +id;
    });

    this.route.params.subscribe(params => {
      console.log(params);
      if (params['taskId']) {
        this.taskId = +params['taskId'];
      }
    });
  }

  ngOnInit() {
  }

  onSaveTaskActivityItem() {
    this.saveTaskActivityItem = !this.saveTaskActivityItem;
  }

}
