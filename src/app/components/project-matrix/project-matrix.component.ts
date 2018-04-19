// core
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Directive, EventEmitter, HostListener, ElementRef, Renderer2, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';


// models
import { Project } from '../../models/project';
import { Task } from '../../models/task';

// dialogs
import { ConfirmDialog } from "../dialogs/dialog";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


// services
import { UserService } from './../../services/user.service'; 
import { ProjectsService } from "../../services";
import { TaskService } from "../../services/task.service";

// breadcrumbs
import { BreadCrumbsService } from '../../services/breadcrumbs.service';
import { BreadCrumb } from './../../models/breadcrumb';

// rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';


@Component({
  selector: 'app-project-matrix',
  templateUrl: './project-matrix.component.html',
  styleUrls: ['./project-matrix.component.scss']
})
export class ProjectMatrixComponent implements OnInit, AfterViewInit {
  data: any;
  project: Project;
  listOfProjects: Project[];
  selectedDuplicateProject: Project;
  isAdmin: boolean;

  breadcrumbs: BreadCrumb[];
  duplicationSubscribe: any;

  projectMatrix: any;
  loaded = false;
  icons: any[] = [];
  disciplineNames: any[] = [
    { category: "Mechanical", svg: '/assets/icons/settings.svg' },
    { category: "Electrical", svg: '/assets/icons/flash_on.svg' },
    { category: "Fire", icon: 'whatshot' },
    { category: "Hydraulic", svg: '/assets/icons/opacity.svg' },
    { category: "ELV", icon: 'tune' },
    { category: "Elevators", icon: 'swap_vert' },
    { category: "AV", icon: 'play_circle_filled' },
    { category: "ICT", icon: 'storage' },
    { category: "Acoustics", icon: 'hearing' },
    { category: "Local Authority", svg: '/assets/icons/localy.svg' },
    { category: "Structural", svg: '/assets/icons/structural.svg' },
  ];
  xStartElementPoint;
  yStartElementPoint;
  xStartMousePoint;
  yStartMousePoint;
  mousemoveEvent;
  mouseupEvent;
  curX;
  curY;

  constructor(
    private service: ProjectsService,
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _location: Location,
    public dialog: MatDialog,
    private breadCrumbsService: BreadCrumbsService,
    public snackBar: MatSnackBar
  ) {
    route.params.subscribe(({ id }) => {
      /*service.getPhasesMatrix(+id).subscribe(data => {
        this.data = data;
      });*/
    });
  }

  ngOnInit() {

    this.project = this.route.snapshot.data.projectData;
    this.listOfProjects = this.route.snapshot.data.projectsData;

    this.isAdmin = this.userService.isAdmin;

    this.listOfProjects.find((project, index, list) => {
      if (project.id === this.project.id) {
        list.splice(index, 1);
      }
      return project.id === this.project.id;
    });

    this.setBreadCrumbs();
    
    this.data = this.route.snapshot.data.projectMatrixData;

    let hide = ['LA - Environmental Impact Assessment Report', 'LA - Fire Approval 1st Stage', 'LA Fire Approval 2nd Stage (or Single Stage)', 'LA Construction License'];

    let index = [];
    this.data.column_headers = this.data.column_headers.filter((val, i) => {
      let tmp = true;

      hide.forEach(h => {
        h = h.trim().toLocaleLowerCase();
        if (h.trim().toLocaleLowerCase() === val.trim().toLocaleLowerCase()) {
          tmp = false;
          index.push(i);
        }
      });

      return tmp;
    });

    this.data.columns = this.data.columns.filter((val, i) => {
      let tmp = true;

      index.forEach(h => {
        
        if (h === i) {
          tmp = false;
        }
      });

      return tmp;
    });

    this.data.row_headers.forEach((disciplineName: string) => {
      let name = disciplineName.toLocaleLowerCase().trim();

      let icon = this.disciplineNames.find(nameWithIcon => {
        return name === nameWithIcon.category.toLocaleLowerCase().trim();
      });

      if (icon) {
        this.icons.push(icon);
      } else {
        this.icons.push({
          category: disciplineName,
          icon: 'build'
        })
      }
    });
  }


  ngAfterViewInit() {
    setTimeout(() => { console.log('Loaded!'); this.loaded = true; }, 400);
  }

  setBreadCrumbs() {

    if (this.userService.isAdmin) {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: 'Projects',
          url: '/projects'
        },
        {
          label: this.project.name,
          url: `/projects/${this.project.id}/matrix`
        },
      ]);
    } else {
      this.breadCrumbsService.setBreadcrumbs([
        {
          label: this.project.name,
          url: `/projects/${this.project.id}/matrix`
        },
      ]);
    }
  
  }

  createTask(projectId, disciplineId, designStageId) {
    let defaultTask: Task = new Task();
    defaultTask.name = 'New Task';
    defaultTask.project_id = projectId;
    defaultTask.discipline_id = disciplineId;
    defaultTask.design_stage_id = designStageId;

    this.taskService.addTask(defaultTask).subscribe(res => {
      this.router.navigate(['projects', this.project.id, 'tasks', res.id])
    });
  }

  goBack() {
    this.router.navigate(['projects']);
  }

  goBackUser() {
    this.router.navigate(['projects', this.project.id]);
  }

  openDialog(duplicationProject) { 
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {
        title: `Duplicate ${this.project.name} to ${duplicationProject.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.duplicate(duplicationProject);
      }
    });
  }

  duplicate(project) {
    this.duplicationSubscribe = this.service.duplicationProject(this.project.id, project.id).subscribe(res => {
      let snackBarRef = this.snackBar.open('The project was duplicated', '', {
        duration: 3000
      });
    });
  }

  ngOnDestroy() {
    if (this.duplicationSubscribe) this.duplicationSubscribe.unsubscribe();
  }
}


@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  mouseDown$ = Observable.fromEvent(this.element.nativeElement, 'mousedown');
  mouseMove$ = Observable.fromEvent(this.element.nativeElement, 'mousemove');
  mouseUp$ = Observable.fromEvent(this.element.nativeElement, 'mouseup');
  mouseLeave$ = Observable.fromEvent(this.element.nativeElement, 'mouseleave');

  touchStart$ = Observable.fromEvent(this.element.nativeElement, 'touchstart');
  touchMove$ = Observable.fromEvent(this.element.nativeElement, 'touchmove');
  touchEnd$ = Observable.fromEvent(this.element.nativeElement, 'touchend');

  CSS = {
    translate: function (x, y) {
      var tr = '-webkit-transform: translate(' + x + 'px, ' + y + 'px);' +
        '-moz-transform: translate(' + x + 'px, ' + y + 'px);' +
        '-ms-transform: translate(' + x + 'px, ' + y + 'px);' +
        '-o-transform: translate(' + x + 'px, ' + y + 'px);' +
        'transform: translate(' + x + 'px, ' + y + 'px);';

      return tr;
    }
  }

  prevX: number;
  prevY: number;
  startX: number;
  startY: number;
  currentXTouchPosition: number = 0;
  currentYTouchPosition: number = 0; 


  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.element.nativeElement, "style", this.CSS.translate(0, 0)); 
  }

  ngOnInit() {
    //this.handleTouch();

    if (this.is_touch_device()) {
      this.renderer.setAttribute(this.element.nativeElement.parentElement, "style", "overflow: scroll"); 
    } else {
      this.handleMouse();
    }
  }

  is_touch_device() {

    return 'ontouchstart' in window || navigator.maxTouchPoints;      
  };

  handleTouch() {

    // inititial dragging values
    this.touchStart$.subscribe((e: TouchEvent) => {
      if (!e) return;

      let transform = this.element.nativeElement.parentNode.children[0].style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);

      let dx = transform[1];
      let dy = transform[2];

      this.startX = e.changedTouches[0].clientX + parseInt(dx);
      this.startY = e.changedTouches[0].clientY + parseInt(dy);
    });

    this.touchEnd$.subscribe((e: TouchEvent) => {
      if (!e) return;

      this.currentXTouchPosition = e.changedTouches[0].clientX - this.startX + this.currentXTouchPosition;
      this.currentYTouchPosition = e.changedTouches[0].clientY - this.startY + this.currentYTouchPosition;
    });


    this.touchMove$.subscribe((e: TouchEvent) => {

      const transform = this.element.nativeElement.style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);
      
      if (!e) return;

      const dx = -this.startX + e.changedTouches[0].clientX + this.currentXTouchPosition,
        dy = e.changedTouches[0].clientY - this.startY + this.currentYTouchPosition;

      this.moveTo(dx, dy);
    });
  }

  handleMouse() {
    const moveUntilMouseUp$ = this.mouseMove$.takeUntil(this.mouseUp$);
    const drag$ = this.mouseDown$.switchMapTo(moveUntilMouseUp$.startWith(null));

    this.mouseUp$.subscribe((e: MouseEvent) => {
      this.element.nativeElement.classList.remove("active");
    })

    // inititial dtagging values
    this.mouseDown$.subscribe((e: MouseEvent) => {
      if (!e) return;

      this.element.nativeElement.classList.add("active");

      let transform = this.element.nativeElement.parentNode.children[0].style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);

      let dx = transform[1];
      let dy = transform[2];

      this.startX = e.clientX + window.scrollX - parseInt(dx);
      this.startY = e.clientY + window.scrollY - parseInt(dy);

    });

    // draggin
    drag$.subscribe((e: MouseEvent) => {
      if (!e) return;

      const dx = e.clientX + window.scrollX - this.startX,
        dy = e.clientY + window.scrollY - this.startY;

      this.moveTo(dx, dy);

    });
  }

  moveTo(dx: number, dy: number) {

    const transform = this.element.nativeElement.style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);

    //dx = dx + parseInt(transform[1]);
    //dy = dy + parseInt(transform[2]);


    if (transform[2] > 0 && dy > 0 || dy < 0 && this.element.nativeElement.parentElement.offsetHeight >= dy + this.element.nativeElement.offsetHeight + 48) {
      dy = this.prevY || parseInt(transform[2]);
    } else {
      this.prevY = dy;
    }

    if (transform[1] > 0 && dx > 0 || dx < 0 && this.element.nativeElement.parentElement.offsetWidth >= dx + this.element.nativeElement.offsetWidth) {
      dx = this.prevX || parseInt(transform[1]);
    } else {
      this.prevX = dx;
    }

    if (dx + parseInt(transform[1]) > 0) dx = parseInt(transform[1]);
    if (dy + parseInt(transform[2]) > 0) dy = parseInt(transform[2]);

    

    dx = +dx.toFixed(2);
    dy = +dy.toFixed(2);

    this.element.nativeElement.style.transform = `translate(${dx}px, ${dy}px)`;
    //this.element.nativeElement.setAttribute("style", this.CSS.translate(dx, dy));
  }

  @HostListener("mousedown", ['$event']) onMouseUp(event) {

  }

  @HostListener("mouseup", ['$event']) onMouseDown(event: MouseEvent) {
  }

  @HostListener("mousemove", ['$event']) onMouseMove(event: MouseEvent) {

  }
}
