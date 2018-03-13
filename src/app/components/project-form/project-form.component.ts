import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../../models/project';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {
  addProject: FormGroup;
  _project: Project;
  @Input('submit') submit: boolean;

  @Input() set project(project: Project) {
    if (project) this._project = project;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this._project);

    this.addProject = this.fb.group({
      name: [typeof this._project === 'undefined' ? null : this._project.name, Validators.required],
      description: typeof this._project === 'undefined' ? null : this._project.description,
      image: [{ value: typeof this._project === 'undefined' ? null : this._project.image.url, disabled: false }]
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if ( typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form

    
    if (!this.addProject.valid) {
      this.snackBar.open('Check your fields', '', {
        duration: 2000,
      });
    } else {
      console.log('Save project', this.addProject.get('image')); 
    }

  }

  changed() {
    console.log('On change work'); 
  }

}
