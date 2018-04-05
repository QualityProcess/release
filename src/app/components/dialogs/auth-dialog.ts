import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'delete-dialog',
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
export class AuthDialog {

  constructor(
    public dialogRef: MatDialogRef<AuthDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOninit() {
    console.log("init auth dialog");

    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/tab-auth/simple-start",
      width: 600,
      height: 535,
      successCallback: function (result) {
        //getUserProfile(result.accessToken);
      },
      failureCallback: function (reason) {
        //handleAuthError(reason);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
