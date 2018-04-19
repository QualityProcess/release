import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { GoogleChartComponent } from 'ng2-google-charts';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";

import * as d3 from 'd3';

@Component({
  selector: 'bar-view',
  templateUrl: './bar-view.component.html',
  styleUrls: ['./bar-view.component.scss']
})
export class BarViewComponent implements OnInit {
  data: any;
  viewData: any;
  @ViewChild('bar') bar: any;
  width: number;
  height: number;
  inputData: any;
  loaded: boolean = false;
  currentData: any[] = [];
  
  constructor(private service: TaskService,
    private projectService: ProjectsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.loaded = true;
    let id;
    this.route.parent.parent.params.subscribe(params => {
      console.log(params);
      this.service.getTask(+params["task_id"]).subscribe(res => {
        this.data = res;

        console.log(this.data);
        let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

        response$.subscribe(result => {

          this.data.task_phases.sort(function (a, b) {
            return a.sort - b.sort;
          });

          this.data.task_phases.forEach((taksPhase, index, taskPhases) => {

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

          this.data = this.data.task_phases;

          this.initBar();
        });
      });
    });
  }

  initBar() {
    console.log(this.data);
    //this.width = this.bar.nativeElement.offsetWidth;
    //this.height = this.bar.nativeElement.offsetWidth;

    for (let obj of this.data) {

      let inputData = {
        input: obj.id,
        data: []
      }

      obj.task_activities.forEach((task_activity) => {

        let barData = [];
        var height = task_activity.task_activity_items.length * 30;
        let textStyle = {
          color: '#000000',
          fontName: "Roboto",
          fontWeight: 100,
          fontSize: 16
        };

        let taskActivityItemData = {
          taskActivityItem: task_activity.id,
          google: {
            chartType: 'BarChart',
            options: {
              //width: this.width,
              height: height + 80,
              textStyle: textStyle,
              chartArea: {
                width: '50%',
                height: height,
              },
              //title: task_activity.name,
              titleTextStyle: textStyle,
              legend: {
                position: 'top',
                maxLines: 5,
                textStyle: textStyle
              },
              tooltip: {
                textStyle: textStyle
              },
              vAxis: {
                textStyle: textStyle
              },
              bar: { groupWidth: '75%' },
              isStacked: true,
              backgroundColor: { fill: 'transparent' },
              series: {
                0: { color: '#008081' },
                1: { color: '#efefef' },
                2: { color: '#205510' },
                3: { color: 'blue' },
                4: { color: 'yellow' }
              }
            },
            dataTable: [
              ['Genre', 'Actual hours', 'Estimated hours', 'hours over', { role: 'style' }, { role: 'annotation' }]

            ]
          }
        }

        task_activity.task_activity_items.forEach((task_activity_item) => {
          let calculationValue,
            estimateHours,
            actulaHours;

          actulaHours = +task_activity_item.hours_actual;
          estimateHours = +task_activity_item.hours_estimated;
          calculationValue = actulaHours - estimateHours;

          if (calculationValue > 0) {
            actulaHours = 0;
          } else if (calculationValue == 0) {
            estimateHours = 0;
          } else if (calculationValue < 0) {
            estimateHours = Math.abs(calculationValue);
            calculationValue = 0;
          }

          if (isNaN)

          taskActivityItemData.google.dataTable.push(
            [task_activity_item.name, actulaHours, estimateHours, calculationValue, "height: 30px", '']
          )

        });

        inputData.data.push(taskActivityItemData);
      });

      this.currentData.push(inputData);
    }
  }
}
