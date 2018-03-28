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
          const yearMonthDayEnd = dateObjEnd.getUTCFullYear() + '-' + pad(dateObjEnd.getUTCMonth() + 1) + '-' + pad(dateObjEnd.getUTCDate() );
          console.log('date:',yearMonthDay);

          this.currentData.push({
            id: task_activity_item.id,
            activity: task_activity,
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
        contentHeight: window.innerHeight - 310,
        height: window.innerHeight - 310,
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
    console.log(model);

    if (model.event.start === null) return;
    if (model.event.end === null) {
      model.event.end = new Date();
      model.event.end.setDate(model.event.start._d.getDate() + 1);
    };

    let data = {
      estimated_start: model.event.start._d,
      estimated_completion: model.event.end._d
    }

    if (this.updateEventSubscribe) this.updateEventSubscribe.unsubscribe();

    let phaseIndex;
    let activityIndex;
    let itemIndex;

    let phase = this.dataSource.find((phase, index) => {
      if (+phase.id === +model.event.activity.task_phase_id) phaseIndex = index;
      return +phase.id === +model.event.activity.task_phase_id;
    });
    let taskActivity = phase.task_activities.find((act, index) => {
      if (+model.event.activity.id === +act.id) activityIndex = index;
      return +model.event.activity.id === +act.id
    });

    let value = taskActivity.task_activity_items.find((i, index) => {
      if (+model.event.id === +i.id) itemIndex = index;
      return +model.event.id === +i.id
    });

    this.dataSource[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex].estimated_start = data.estimated_start;
    this.dataSource[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex].estimated_completion = data.estimated_completion;

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
