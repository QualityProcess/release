import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectsService } from "../../services";
import { TaskService } from "../../services/task.service";
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Directive, EventEmitter, HostListener, ElementRef, Renderer2, Output } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser'
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
  projectMatrix: any;
  loaded = false;
  icons: any[] = [];
  disciplineNames: any[] = [
    { category: "Mechanical", icon: 'settings' },
    { category: "Electrical", icon: 'flash_on' },
    { category: "Fire", icon: 'whatshot' },
    { category: "Hydraulic", icon: 'opacity' },
    { category: "ELV", icon: 'tune' },
    { category: "Elevators", icon: 'swap_vert' },
    { category: "AV", icon: 'play_circle_filled' },
    { category: "ICT", icon: 'storage' },
    { category: "Acoustics", icon: 'hearing' },
  ];
  xStartElementPoint;
  yStartElementPoint;
  xStartMousePoint;
  yStartMousePoint;
  mousemoveEvent;
  mouseupEvent;
  curX;
  curY;

  constructor(private service: ProjectsService, private taskService: TaskService, private route: ActivatedRoute, private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {
    route.params.subscribe(({ id }) => {
      /*service.getPhasesMatrix(+id).subscribe(data => {
        this.data = data;
      });*/
    });
  } 

  ngOnInit() {
    this.project = this.route.snapshot.data.projectData;
    
    this.data = this.route.snapshot.data.projectMatrixData;
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
          icon: 'add'
        })
      }
   
    }); 
    console.log(this.project);
    console.log(this.data);
    console.log(this.icons);
  }


  ngAfterViewInit() {
    setTimeout(() => { console.log('Loaded!'); this.loaded = true; }, 400);
    
  }

  createTask(projectId, disciplineId, designStageId) {
    let defaultTask: Task = new Task();
    defaultTask.name = 'New Task';
    defaultTask.project_id = projectId;
    defaultTask.discipline_id = disciplineId;
    defaultTask.design_stage_id = designStageId;
    console.log(defaultTask);
    this.taskService.addTask(defaultTask).subscribe(res => {
      console.log(res);

      this.router.navigate(['/tasks', res.id])
    });
  }

  createDiscipline(){
  
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
    console.log(window.ontouchstart);
    console.log(navigator.maxTouchPoints);
    return 'ontouchstart' in window || navigator.maxTouchPoints;      
  };

  handleTouch() {

    // inititial dtagging values
    this.touchStart$.subscribe((e: TouchEvent) => {
      if (!e) return;

      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
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

    // inititial dtagging values
    this.mouseDown$.subscribe((e: MouseEvent) => {
      if (!e) return;

      this.startX = e.clientX + window.scrollX;
      this.startY = e.clientY + window.scrollY;

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
    console.log('before: ', dy);
    if (transform[2] > 0 && dy > 0 || dy < 0 && this.element.nativeElement.parentElement.offsetHeight >= dy + this.element.nativeElement.offsetHeight) {
      dy = this.prevY || 0;
    } else {
      this.prevY = dy;
    }

    if (transform[1] > 0 && dx > 0 || dx < 0 && this.element.nativeElement.parentElement.offsetWidth >= dx + this.element.nativeElement.offsetWidth) {
      dx = this.prevX || 0;
    } else {
      this.prevX = dx;
    }

    if (dx > 0) dx = 0;
    if (dy > 0) dy = 0;

    dx = +dx.toFixed(2);
    dy = +dy.toFixed(2);

    console.log('after: ', dy);
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
