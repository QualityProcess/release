import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'enter-field-dialog',
  template: `
      <h1 mat-dialog-title>{{data.title}}</h1>
      <div mat-dialog-content>
        <mat-form-field *ngIf="data.type === 'input'" style="width: 100%">
          <input matInput [(ngModel)]="data.field">
        </mat-form-field>
        <mat-form-field *ngIf="data.type === 'textarea'" style="width: 100%">
          <textarea matInput [(ngModel)]="data.field"></textarea>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-button [mat-dialog-close]="data.field" cdkFocusInitial>Save</button>
      </div>
`,
})
export class EnterFieldDialog{

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EnterFieldDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
