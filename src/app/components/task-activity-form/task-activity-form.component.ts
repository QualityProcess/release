import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";
import { Location } from '@angular/common';

import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';

import { TaskActivity } from '../../models/task-activity';
import { TaskPhase } from '../../models/task-phase';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-activity-form',
  templateUrl: './task-activity-form.component.html',
  styleUrls: ['./task-activity-form.component.scss'] 
})
export class TaskActivityFormComponent implements OnInit {
  addTaskActivity: FormGroup;
  _taskActivity: TaskActivity;
  taskId: number;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false;
  @Input('taskPhases') taskPhases: TaskPhase[];
  @Input('taskId') taskIdEdit: number;

  deleteActivitySubcribe: any;

  @Input() set taskActivity(taskActivity: TaskActivity) {
    if (taskActivity) this._taskActivity = taskActivity;
  }

  constructor(
   private fb: FormBuilder,
   public snackBar: MatSnackBar,
   public dialog: MatDialog,
   private service: TaskService,
   private router: Router,
   private route: ActivatedRoute,
   private _location: Location
 ) { }

  ngOnInit() {

    if (!this.isEdit) {
      this.taskId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.taskId = this.taskIdEdit;
      this.getTaskPhases();
    }
    
    console.log(this._taskActivity);
    console.log(this.taskId);
    this.addTaskActivity = this.fb.group({
      name: [typeof this._taskActivity === 'undefined' ? null : this._taskActivity.name],
      task_phase_id: [typeof this._taskActivity === 'undefined' ? this.taskPhases[0].id || null : this._taskActivity.task_phase_id, Validators.required],
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
        console.log('Edit task activity', this.addTaskActivity.value)
        this.service.updateTaskActivity(this.addTaskActivity.value, this._taskActivity.id)
          .subscribe(taskActivity => {
            console.log('Return ask activity: ', taskActivity);
            this._location.back();
          });
      } else {
        console.log('Add task', this.addTaskActivity.value);

        this.service.addTaskActivity(this.addTaskActivity.value)
          .subscribe(task => {
            this._location.back();
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

  getTaskPhases() {
    this.service.getPhases().subscribe(phases => {
      this.taskPhases = phases.filter(phase => {
        return phase.task_id === this.taskId;
      });

    })
  }

  openDeleteTaskActivityDialog(item) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: item,
        title: `Delete ${item.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteActivity(item);
      }
    });
  }

  deleteActivity(activity: TaskActivity) {
    this.deleteActivitySubcribe = this.service.deleteTaskActivity(activity.id).subscribe(res => {
      this._location.back();
    });
  }

}
