import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  addTask: FormGroup;
  _task: Task;
  @Input('submit') submit: boolean;

  @Input() set task(task: Task) {
    if (task) this._task = task;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this._task);

    this.addTask = this.fb.group({
      name: [typeof this._task === 'undefined' ? null : this._task.name, Validators.required],
      description: typeof this._task === 'undefined' ? null : this._task.description,
      image: [{ value: typeof this._task === 'undefined' ? null : this._task.image.url, disabled: false }]
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form


    if (!this.addTask.valid) {
      this.snackBar.open('Check your fields', '', {
        duration: 2000,
      });
    } else {
      console.log('Save task');
    }
  }

}
