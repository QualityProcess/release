import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';

import { TaskActivity } from '../../models/task-activity';
import { TaskPhase } from '../../models/task-phase';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-activity-form',
  templateUrl: './task-activity-from.component.html',
  styleUrls: ['./task-activity-from.component.scss'] 
})
export class TaskActivityFromComponent implements OnInit {
  addTaskActivity: FormGroup;
  _taskActivity: TaskActivity;
  taskId: number;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false;
  @Input('taskPhases') taskPhases: TaskPhase[];

  @Input() set taskActivity(taskActivity: TaskActivity) {
    if (taskActivity) this._taskActivity = taskActivity;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private service: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    console.log(this._taskActivity);

    this.addTaskActivity = this.fb.group({
      name: [typeof this._taskActivity === 'undefined' ? null : this._taskActivity.name, Validators.required],
      task_phase_id: [typeof this._taskActivity === 'undefined' ? this.taskPhases[0].id : this._taskActivity.task_phase_id, Validators.required],
      description: typeof this._taskActivity === 'undefined' ? null : this._taskActivity.description,
      image: [{ value: typeof this._taskActivity === 'undefined' ? null : this._taskActivity.image.url, disabled: false }],
      is_enabled: typeof this._taskActivity === 'undefined' ? null : this._taskActivity.is_enabled
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;
    
    if (!this.addTaskActivity.valid) {
      console.log('Not Valid', this.addTaskActivity.value);
    } else {
      if (this.isEdit) {
        console.log('Edit task', this.addTaskActivity.value)
        /*this.service.updateTaskActivity(this.addTaskActivity.value, this._taskActivity.id)
          .subscribe(project => {
            console.log('Return project: ', project);
            this.snackBar.open('Project saved!', '', {
              duration: 2000,
            });
          });*/
      } else {
        console.log('Add task', this.addTaskActivity.value);

        this.service.addTaskActivity(this.addTaskActivity.value)
          .subscribe(task => {
            this.router.navigate(['/tasks', this.taskId]);
         });
      }
    }
  }

  onUploadedImage(reader) {
    this.addTaskActivity.patchValue({
      image: reader.result
    });

    console.log(this.addTaskActivity.value);
  }

}
