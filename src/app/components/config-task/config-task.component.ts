import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TaskActivityItem } from "../../models/task-activity-item";
import { TaskService } from "../../services/task.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

@Component({
  selector: 'config-task', 
  templateUrl: './config-task.component.html',
  styleUrls: ['./config-task.component.scss']
})
export class ConfigTaskComponent implements OnInit, OnDestroy {

  @Input('data') dataSource: any;
  taskActivityItems: TaskActivityItem[];

  constructor(private service: TaskService, public dialog: MatDialog) { }

  ngOnInit() {

    console.log(this.dataSource);
  }

  ngOnDestroy() {
    console.log(this.dataSource);
  }

  openDeleteTaskActivityItemDialog(item) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: item,
        title: `Delete item ${item.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item: TaskActivityItem) {
    this.service.deleteTaskActivityItem(item.id).subscribe();
  }

}
