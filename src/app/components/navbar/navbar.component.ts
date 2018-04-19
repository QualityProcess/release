import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from "../dialogs/delete-dialog";

// services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'; 
import { TaskService } from '../../services/task.service';

// models
import { Task } from './../../models/task';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string = 'Admin';
  isTab: boolean = false;
  breadcrumbs: BreadCrumb[];
  currentProjectUrl: string; // if has current project
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

    if (this.breadCrumbsService.currentProjectUrl) this.currentProjectUrl = this.breadCrumbsService.currentProjectUrl.replace('matrix', '');
    
    console.log("this.currentProjectUrl: ", this.currentProjectUrl);

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
