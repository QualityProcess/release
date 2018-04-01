import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';


import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";
import { Task } from "../../models/task";
import { Discipline } from "../../models/discipline";
import { DesignStage } from "../../models/design-stage";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";
import { Location } from '@angular/common';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  events: any[];
  data: any;
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  inputData: any;
  updateEventSubscribe: any;
  currentData = [];
  loaded = false;

  constructor(
    private service: TaskService,
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {

    this.getTask();
    
  }

  initSchedule() {
    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    for (let obj of this.data) {

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
          console.log('date:', yearMonthDay);

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

          this.initSchedule();
        });
      });
    });
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

    let phase = this.data.find((phase, index) => {
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

    this.data[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex].estimated_start = data.estimated_start;
    this.data[phaseIndex].task_activities[activityIndex].task_activity_items[itemIndex].estimated_completion = data.estimated_completion;

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
