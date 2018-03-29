import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { GoogleChartComponent } from 'ng2-google-charts';

import * as d3 from 'd3';

@Component({
  selector: 'horizontal-histogram',
  templateUrl: './horizontal-histogram.component.html',
  styleUrls: ['./horizontal-histogram.component.scss']
})
export class HorizontalHistogramComponent implements OnInit {
  @Input('data') dataSource;
  viewData: any;
  @ViewChild('bar') bar: any;
  width: number;
  height: number;
  inputData: any;
  currentData: any[] = [];
  
  constructor() { }

  ngOnInit() {
    console.log(this.dataSource);
    //this.width = this.bar.nativeElement.offsetWidth;
    //this.height = this.bar.nativeElement.offsetWidth;

    for (let obj of this.dataSource) {

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
              backgroundColor: { fill: 'transparent' }
            },
            dataTable: [
              ['Genre', 'Estimated hours', 'actual hours', 'hours over', { role: 'style' }, { role: 'annotation' }]
              
            ]
          }
        }

        task_activity.task_activity_items.forEach((task_activity_item) => {
          let value = task_activity_item.hours_estimated - task_activity_item.hours_actual;
          value = value <= 0 ? 0 : value;

          taskActivityItemData.google.dataTable.push(
            [task_activity_item.name, task_activity_item.hours_actual, task_activity_item.hours_estimated, value, "height: 30px", '']
          )

          //barData.push(taskActivityItemData);
        });
        console.log(taskActivityItemData);
        inputData.data.push(taskActivityItemData);
      });

      this.currentData.push(inputData); 
    }
  }
}
