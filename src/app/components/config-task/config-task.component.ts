import { Component, OnInit, Input } from '@angular/core';
import { TaskActivityItem } from "../../models/task-activity-item";

@Component({
  selector: 'config-task', 
  templateUrl: './config-task.component.html',
  styleUrls: ['./config-task.component.scss']
})
export class ConfigTaskComponent implements OnInit {

  @Input('data') dataSource: any;
  taskActivityItems: TaskActivityItem[];

  constructor() { }

  ngOnInit() {

    console.log(this.dataSource);
  }

}
