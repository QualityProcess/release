import { Component, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'notification-dialog',
  template: `
      <mat-dialog-content>{{ data.title }}</mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true">Ok</button>
      </mat-dialog-actions>
`,
})
export class NotificationDialog {

  constructor(
    public dialogRef: MatDialogRef<NotificationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
