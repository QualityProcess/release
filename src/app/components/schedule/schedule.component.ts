import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  @Input('data') dataSource: any;
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  inputData: any;
  currentData = [];

  constructor() {}
  ngOnInit() {

    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }


    for (let obj of this.dataSource) {

      this.inputData = {
        input: obj.id,
        data: [

        ]
      }
      obj.task_activities.forEach((task_activity) => {

        task_activity.task_activity_items.forEach((task_activity_item) => {

          const dateObj = new Date(task_activity_item.estimated_start);
          const yearMonthDay = dateObj.getUTCFullYear() + '-' + pad(dateObj.getUTCMonth() + 1) + '-' + pad(dateObj.getUTCDate()+1);

          const dateObjEnd = new Date(task_activity_item.estimated_completion);
          const yearMonthDayEnd = dateObjEnd.getUTCFullYear() + '-' + pad(dateObjEnd.getUTCMonth() + 1) + '-' + pad(dateObjEnd.getUTCDate()+1);


          this.currentData.push({
            start: yearMonthDay,
            end: yearMonthDayEnd,
            title: task_activity_item.name
          });
        });
      })
    }


    console.log(this.currentData);

     this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: this.currentData
      };
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}
