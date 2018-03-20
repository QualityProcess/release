import { Component, OnInit, Input } from '@angular/core';
import * as google from 'ng2-google-charts';

@Component({
  selector: 'circle-view',
  templateUrl: './circle-view.component.html',
  styleUrls: ['./circle-view.component.scss']
})
export class CircleViewComponent implements OnInit {
  @Input('data') dataSource;
  date: Date = new Date(2015, 0, 1);
  date1: Date = new Date(2015, 0, 3);
  inputData: any;
  currentData = [];
  data: any;
  constructor() { }

  dataa: any = {
    chartType: 'Timeline',
    dataTable: [
      ['Name', 'From', 'To'],
      ['Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)]
    ],
    options: {
      width: 400,
      height: 40,
      legend: { position: 'top', maxLines: 5 },
      bar: { groupWidth: '75%' },
      isStacked: true,
      backgroundColor: { fill: 'transparent' }
    }
  }

  ngOnInit() {

    for (let obj of this.dataSource) {

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

}
