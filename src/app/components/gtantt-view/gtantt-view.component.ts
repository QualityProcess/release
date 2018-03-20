import { Component, OnInit, Input } from '@angular/core';
import * as google from 'ng2-google-charts';

@Component({
  selector: 'gtantt-view',
  templateUrl: './gtantt-view.component.html',
  styleUrls: ['./gtantt-view.component.scss']
})
export class GtanttViewComponent implements OnInit {
  @Input('data') dataSource;
  date: Date = new Date(2015, 0, 1);
  date1: Date = new Date(2015, 0, 3);
  inputData: any;
  currentData = [];
  data: any;
  constructor() { }

  dataa:any = {
      chartType: 'Gantt',
      dataTable: [
        [['string', 'Task Name'], ['string', 'Resource'], ['date', 'Start Date'], ['date', 'End Date'], ['number', 'Duration'], ['number', 'Percent Complete'], ['string', 'Dependencies']],
        ['Research', 'Find sources',
          new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
        ['Write', 'Write paper',
          null, new Date(2015, 0, 9), this.daysToMilliseconds(3), 25, null],
        ['Cite', 'Create bibliography',
          null, new Date(2015, 0, 7), this.daysToMilliseconds(1), 20, null],
        ['Complete', 'Hand in paper',
          null, new Date(2015, 0, 10), this.daysToMilliseconds(1), 0, null],
        ['Outline', 'Outline paper',
          null, new Date(2015, 0, 6), this.daysToMilliseconds(1), 100, null]
      ],
      options: {
        grantt: {
          arrow: null
        }
      }
  }

  daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
  }


  ngOnInit() {
    console.log(this.dataSource);
    

    for (let obj of this.dataSource) {

      this.inputData = {
        input: obj.id,
        data: [
          
        ]
      }

      obj.task_activities.forEach((task_activity) => {
        let taskActivityData = {
          taskActivity: task_activity.id,
          resultEstimated: 0,
          resultActivite: 0,
          google: {
            chartType: 'Gantt',
            options: {
              criticalPathEnabled: false,
              width: 1400
              //backgroundColor: { fill: 'transparent' }
            },
            dataTable: [
              
            ]
          }
        }

        let granttData = [];
        
        task_activity.task_activity_items.forEach((task_activity_item) => {
          granttData.push([task_activity_item.name, task_activity_item.name, new Date(task_activity_item.estimated_start), new Date(task_activity_item.estimated_completion), this.daysToMilliseconds(10), 100, null])
          
        });

        let resultHours = taskActivityData.resultEstimated - taskActivityData.resultActivite;

        resultHours = resultHours <= 0 ? 0 : taskActivityData.resultEstimated - taskActivityData.resultActivite;

        taskActivityData.google.dataTable = [
          [['string', 'Task Name'], ['string', 'Resource'], ['date', 'Start Date'], ['date', 'End Date'], ['number', 'Duration'], ['number', 'Percent Complete'], ['string', 'Dependencies']],
          ...granttData
        ]


        this.inputData.data.push(taskActivityData);
      })

      this.currentData.push(this.inputData);
    }

    console.log('', this.currentData);

  }


}
