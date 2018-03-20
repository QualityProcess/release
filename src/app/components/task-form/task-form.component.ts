import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';

import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { Discipline } from '../../models/discipline';
import { DesignStage } from '../../models/design-stage';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  addTask: FormGroup;
  _task: Task;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false;
  @Input('projects') projects: Project[];
  @Input('disciplines') disciplines: Discipline[];
  @Input('designStages') designStages: DesignStage[];
  @Input('currentDisciplineId') currentDisciplineId;
  @Input('currentDesignStageId') currentDesignStageId;
  @Input('currentProjectId') currentProjectId;
  
  @Input() set task(task: Task) {
    if (task) this._task = task;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private service: TaskService, private router: Router) { }
   
  ngOnInit() {
    console.log(this._task);
    console.log(typeof this.currentDisciplineId);
    console.log(this.currentDesignStageId);

    this.addTask = this.fb.group({
      name: [typeof this._task === 'undefined' ? null : this._task.name, Validators.required],
      project_id: [typeof this._task === 'undefined' ? parseInt(this.currentProjectId) || null : this._task.project_id, Validators.required],
      discipline_id: [typeof this._task === 'undefined' ? parseInt(this.currentDisciplineId) || null : this._task.discipline_id, Validators.required],
      design_stage_id: [typeof this._task === 'undefined' ? parseInt(this.currentDesignStageId) || null : this._task.design_stage_id, Validators.required],
      description: typeof this._task === 'undefined' ? null : this._task.description,
      image: [{ value: typeof this._task === 'undefined' ? null : this._task.image.url, disabled: false }],
      is_enabled: typeof this._task === 'undefined' ? null : this._task.is_enabled,
      is_template: false
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form
     console.log(this.addTask.value); 

    if (!this.addTask.valid) {
      console.log('Not Valid', this.addTask.value);
    } else {
      if (this.isEdit) {
          this.service.updateTask(this.addTask.value, this._task.id)
            .subscribe( project => {
              console.log('Return project: ', project);
              this.snackBar.open('Project saved!', '', {
                duration: 2000,
              });
          });
      } else {
          console.log('Add task', this.addTask.value)

          this.service.addTask(this.addTask.value)
            .subscribe(task => {
                this.router.navigate(['tasks']);
          });
      }
    }
  }

  onUploadedImage(reader) {
    this.addTask.patchValue({
      image: reader.result
    });
  }

}
