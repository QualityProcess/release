import { Component, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  template: `
      <h2 mat-dialog-title style="color: black">{{ data.title }}</h2>
      <mat-dialog-content>Are you sure?</mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
        <button mat-button [mat-dialog-close]="true">Yes</button>
      </mat-dialog-actions>
`,
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
