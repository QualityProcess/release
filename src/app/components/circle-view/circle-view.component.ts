import { Component, OnInit, Input } from '@angular/core';

import * as google from 'ng2-google-charts';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";

@Component({
  selector: 'circle-view',
  templateUrl: './circle-view.component.html',
  styleUrls: ['./circle-view.component.scss']
})
export class CircleViewComponent implements OnInit {
  date: Date = new Date(2015, 0, 1);
  date1: Date = new Date(2015, 0, 3);
  inputData: any;
  currentData = [];
  data: any;
  loaded = false;


  constructor(private service: TaskService,
    private projectService: ProjectsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTask(); 
  }

  initCircle() {

    for (let obj of this.data) {

      this.inputData = {
        input: obj.id,
        data: []
      }

      obj.task_activities.forEach((task_activity) => {
        let taskActivityData = {
          taskActivity: task_activity.id,
          resultEstimated: 0,
          resultActivite: 0,
          google: {
            chartType: 'PieChart',
            options: {
              backgroundColor: { fill: 'transparent' }
            },
            dataTable: []
          }
        }

        task_activity.task_activity_items.forEach((task_activity_item) => {
          taskActivityData.resultEstimated += task_activity_item.hours_estimated;
          taskActivityData.resultActivite += task_activity_item.hours_actual;

        });

        let resultHours = taskActivityData.resultEstimated - taskActivityData.resultActivite;

        resultHours = resultHours <= 0 ? 0 : taskActivityData.resultEstimated - taskActivityData.resultActivite;

        taskActivityData.google.dataTable = [
          ['Task', 'hours'],
          ['Actual', taskActivityData.resultEstimated],
          ['Estimated', taskActivityData.resultActivite],
          ['Over', resultHours]
        ]

        this.inputData.data.push(taskActivityData);
      })

      this.currentData.push(this.inputData);
    }
  }

  getTask() {
    this.loaded = true;
    let id;
    this.route.parent.parent.params.subscribe(params => {
      console.log(params);
      this.service.getTask(+params["task_id"]).subscribe(res => {
        this.data = res.task_phases;

        let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

        response$.subscribe(result => {

          this.data.sort(function (a, b) {
            return a.sort - b.sort;
          });

          this.data.forEach((taksPhase, index, taskPhases) => {

            taskPhases[index].task_activities = result[0].filter(item => {
              return item.task_phase_id == taskPhases[index].id;
            });

            taskPhases[index].task_activities.sort(function (a, b) {
              return a.sort - b.sort;
            });

            taskPhases[index].task_activities.forEach((task_activity, i, task_activities) => {
              task_activities[i].task_activity_items = result[1].filter(item => {
                return item.task_activity_id == task_activities[i].id;
              });

              task_activities[i].task_activity_items = task_activities[i].task_activity_items.sort(function (a, b) {
                return a.sort - b.sort;
              });

            });

          });

          this.initCircle();
        });
      });
    });
  }

}
