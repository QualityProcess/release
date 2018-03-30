// Angular core
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {
  addProject: FormGroup;
  _project: Project;
  @Input('submit') submit: boolean;
  @Input('edit') isEdit: boolean = false; 

  @Input() set project(project: Project) {
    if (project) this._project = project;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private service: ProjectsService, private router: Router) { }

  ngOnInit() {
    console.log(this._project);

    this.addProject = this.fb.group({
      name: [typeof this._project === 'undefined' ? null : this._project.name, Validators.required],
      description: typeof this._project === 'undefined' ? null : this._project.description,
      image: [{ value: typeof this._project === 'undefined' ? null : this._project.image.url, disabled: false }]
    });
  }

  onUploadedImage(reader) {
    this.addProject.patchValue({
      image: reader.result
    });

    console.log(this.addProject.value); 
  }

  ngOnChanges(changes: SimpleChanges) {

    if ( typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form
    
    if (!this.addProject.valid) {
      this.snackBar.open('Check your fields', '', {
        duration: 2000,
      });
    } else {
      if (this.isEdit) {
          this.service.updateProject(this.addProject.value, this._project.id)
            .subscribe( project => {
              this.router.navigate(['projects']);
          });
      }else {
          this.service.addProject(this.addProject.value)
            .subscribe( project => {
              this.router.navigate(['projects']);
          });
      }
    }

  }

  changed() {
  }

}
