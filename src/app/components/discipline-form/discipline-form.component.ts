import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.scss']
})
export class DisciplineFormComponent implements OnInit {
  addDiscipline: FormGroup;
  _discipline: Discipline;
  @Input('submit') submit: boolean;

  @Input() set discipline(discipline: Discipline) {
    if (discipline) this._discipline = discipline; 
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this._discipline);

    this.addDiscipline = this.fb.group({
      name: [typeof this._discipline === 'undefined' ? null : this._discipline.category, Validators.required],
      description: typeof this._discipline === 'undefined' ? null : this._discipline.description,
      image: [{ value: typeof this._discipline === 'undefined' ? null : this._discipline.image.url, disabled: false }]
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form


    if (!this.addDiscipline.valid) {
      this.snackBar.open('Check your fields', '', {
        duration: 2000,
      });
    } else {
      console.log('Save discipline');
    }

  }


}
