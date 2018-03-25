import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskService } from "../../services/task.service";
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
  updateEventSubscribe: any;
  currentData = [];

  constructor(private service: TaskService) {}
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
          const yearMonthDay = dateObj.getUTCFullYear() + '-' + pad(dateObj.getUTCMonth() + 1) + '-' + pad(dateObj.getUTCDate());

          const dateObjEnd = new Date(task_activity_item.estimated_completion);
          const yearMonthDayEnd = dateObjEnd.getUTCFullYear() + '-' + pad(dateObjEnd.getUTCMonth() + 1) + '-' + pad(dateObjEnd.getUTCDate());


          this.currentData.push({
            id: task_activity_item.id,
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
        contentHeight: window.innerHeight - 270,
        height: window.innerHeight - 270,
        eventBackgroundColor: '#00796b',
        eventBorderColor: '#00796b',
        header: {
          left: '',
          center: 'title',
          right: ''
        },
        events: this.currentData
      };
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    console.log('Model: ', model);
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
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    }

    let data = {
      estimated_start: model.event.start._d,
      estimated_completion: model.event.end._d
    }

    if (this.updateEventSubscribe) this.updateEventSubscribe.unsubscribe();

    this.updateEventSubscribe = this.service.updateTaskActivityItem(data, +model.event.id).subscribe(res => { });
  }

  ngOnDestroy() {
    if (this.updateEventSubscribe) this.updateEventSubscribe.unsubscribe();
  }

  showNext() {
    this.ucCalendar.fullCalendar('next');
  }

  showPrev() {
    this.ucCalendar.fullCalendar('prev');
  }

  showMonth() {
    this.ucCalendar.fullCalendar('changeView', 'month');
  }

  showWeek() {
    this.ucCalendar.fullCalendar('changeView', 'listWeek');
  }

}
