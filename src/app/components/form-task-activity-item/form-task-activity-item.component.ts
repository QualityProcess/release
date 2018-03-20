import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';

import { TaskActivityItem } from '../../models/task-activity-item';
import { TaskPhase } from '../../models/task-phase';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'form-task-activity-item',
  templateUrl: './form-task-activity-item.component.html',
  styleUrls: ['./form-task-activity-item.component.scss']
})
export class FormTaskActivityItemComponent implements OnInit {
  addTaskActivityItem: FormGroup;
  _taskActivityItem: TaskActivityItem;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false;
  @Input('taskActivityId') taskActivityId: number;
  @Input('taskId') taskId: number;
  
  @Input() set taskActivityItem(taskActivityItem: TaskActivityItem) {
    if (taskActivityItem) this._taskActivityItem = taskActivityItem;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private service: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this._taskActivityItem);
    console.log(this.taskActivityId);

    this.addTaskActivityItem = this.fb.group({
      name: [typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.name, Validators.required],
      link: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.link,
      task_activity_id: typeof this._taskActivityItem === 'undefined' ? this.taskActivityId : this._taskActivityItem.task_activity_id,
      image: [{ value: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.image.url, disabled: false }],
      description: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.description,
      customisation: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.customisation,
      checked_on: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.checked_on,
      checked_by: typeof this._taskActivityItem === 'undefined' ? null : this._taskActivityItem.checked_by,
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
        /*this.service.updateTaskActivity(this.addTaskActivity.value, this._taskActivity.id)
          .subscribe(project => {
            console.log('Return project: ', project);
            this.snackBar.open('Project saved!', '', {
              duration: 2000,
            });
          });*/
      } else {
        console.log('Add task', this.addTaskActivityItem.value);

        this.service.addTaskActivityItem(this.addTaskActivityItem.value)
          .subscribe(task => {
            this.router.navigate(['/tasks', this.taskId]);
          });
      }
    }
  }

  onUploadedImage(reader) {
    this.addTaskActivityItem.patchValue({
      image: reader.result
    });

    console.log(this.addTaskActivityItem.value);
  }

}
