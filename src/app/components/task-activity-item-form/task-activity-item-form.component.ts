import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { TaskActivityItem } from '../../models/task-activity-item';
import { TaskPhase } from '../../models/task-phase';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-activity-item-form',
  templateUrl: './task-activity-item-form.component.html',
  styleUrls: ['./task-activity-item-form.component.scss']
})
export class TaskActivityItemFormComponent implements OnInit {
  addTaskActivityItem: FormGroup;
  _taskActivityItem: TaskActivityItem;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false;
  @Input('taskActivityId') taskActivityId: number;
  @Input('taskId') taskId: number;
  
  @Input() set taskActivityItem(taskActivityItem: TaskActivityItem) {
    if (taskActivityItem) this._taskActivityItem = taskActivityItem;
  }

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private service: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    console.log(this._taskActivityItem);
    console.log(this.taskActivityId);

    this.addTaskActivityItem = this.fb.group({
      name: [typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.name, Validators.required],
      link: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.link,
      task_activity_id: typeof this._taskActivityItem === 'undefined' ? this.taskActivityId : this._taskActivityItem.task_activity_id,
      customisation: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.customisation,
      checked_on: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.checked_on,
      checked_by: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.checked_by,
      qa_date: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.qa_date,
      qa_by: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.qa_by,
      estimated_start: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.estimated_start,
      estimated_completion: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.estimated_completion,
      hours_estimated: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.hours_estimated,
      hours_actual: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.hours_actual,
      is_locked: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.is_locked,
      is_enabled: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.is_enabled
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;

    if (!this.addTaskActivityItem.valid) {
      console.log('Not Valid', this.addTaskActivityItem.value);
    } else {
      if (this.isEdit) {
        console.log('Edit task', this.addTaskActivityItem.value)
        this.service.updateTaskActivityItem(this.addTaskActivityItem.value, this._taskActivityItem.id)
          .subscribe(item => {
            this._location.back();
          });
      } else {

        this.service.addTaskActivityItem(this.addTaskActivityItem.value)
          .subscribe(task => {
            this._location.back();
          });
      }
    }
  }

  onUploadedImage(reader) {
    this.addTaskActivityItem.patchValue({
      image: reader.result
    });
  }

}
