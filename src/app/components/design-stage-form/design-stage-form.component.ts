import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DesignStage } from '../../models/design-stage';
import { Discipline } from '../../models/discipline';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'design-stage-form',
  templateUrl: './design-stage-form.component.html',
  styleUrls: ['./design-stage-form.component.scss']
})
export class DesignStageFormComponent implements OnInit {
  addDesignStage: FormGroup;
  _designStage: DesignStage;
  @Input('submit') submit: boolean;
  currentDiscipline: string = "2";

  @Input() set designStage(designStage: DesignStage) {
    if (designStage) this._designStage = designStage;
  }

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this._designStage);

    this.addDesignStage = this.fb.group({
      name: [typeof this._designStage === 'undefined' ? null : this._designStage.category, Validators.required],
      //discipline: [typeof this._designStage === 'undefined' ? 1 : this._designStage.discipline_id, Validators.required],
      //enabled: typeof this._designStage === 'undefined' ? true : this._designStage.is_enabled,
      description: typeof this._designStage === 'undefined' ? null : this._designStage.description,
      image: [{ value: typeof this._designStage === 'undefined' ? null : this._designStage.image.url, disabled: false }]
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes.submit.previousValue === 'undefined') return;

    // if loaded page and press save btn - submit form


    if (!this.addDesignStage.valid) {
      this.snackBar.open('Check your fields', '', {
        duration: 2000,
      });
    } else {
      console.log('Save designStage');
    }

  }
}
