import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

// environmnet
import { environment } from './../../../environments/environment';

// services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

// models
import { Task } from './../../models/task';

@Component({
  selector: 'middle-nav-bar',
  templateUrl: './middle-nav-bar.component.html',
  styleUrls: ['./middle-nav-bar.component.scss']
})
export class MiddleNavBarComponent implements OnInit {

  username: string = 'Admin';
  isTab: boolean = false;
  public version: string = environment.version;
  breadcrumbs: BreadCrumb[];
  @Input() task: Task;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private taskService: TaskService,
    private breadCrumbsService: BreadCrumbsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.breadCrumbsService.breadcrumbs.subscribe((val: BreadCrumb[]) => {
      this.breadcrumbs = val;
    });

    console.log(this.userService.userInfo.userName);
    if (this.userService.userInfo.userName) {
      this.isTab = true;
      this.username = this.userService.userInfo.userName;
    }

  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        task: this.task,
        title: `Delete task ${this.task.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.delete();
      }
    });
  }

  delete() {
    this.taskService.deleteTask(this.task.id).subscribe(res => {
      this.router.navigate(['/projects', this.task.project_id, 'matrix']);
    });
  }

}
