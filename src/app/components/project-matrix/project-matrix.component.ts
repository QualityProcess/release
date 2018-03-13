import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectsService } from "../../services";
import { Project } from '../../models/project';
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
  loaded = false;
  disciplineNames: Object[] = [
    { category: "Mechanical", icon: 'settings' },
    { category: "Electrical", icon: 'flash_on' },
    { category: "Fire", icon: 'whatshot' },
    { category: "Hydraulic", icon: 'opacity' },
    { category: "ELV", icon: 'tune' },
    { category: "Elevators", icon: 'swap_vert' },
    { category: "AV", icon: 'play_circle_filled' },
    { category: "ICT", icon: 'storage' },
    { category: "Acoustics", icon: 'hearing' },
  ]

  xStartElementPoint;
  yStartElementPoint;
  xStartMousePoint;
  yStartMousePoint;
  mousemoveEvent;
  mouseupEvent;
  curX;
  curY;

  constructor(private service: ProjectsService, private route: ActivatedRoute, private elementRef: ElementRef, private renderer: Renderer2) {
    route.params.subscribe(({ id }) => {
      service.getPhasesMatrix(+id).subscribe(data => {
        this.data = data;
      });
    });
  } 

  ngOnInit() {
    this.project = this.route.snapshot.data.projectData;
  }


  ngAfterViewInit() {
    setTimeout(() => { console.log('Loaded!'); this.loaded = true; }, 400);
    
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

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.element.nativeElement, "style", this.CSS.translate(0, 0)); 
  }

  ngOnInit() {
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

    /*const mousedrag$ = this.mouseDown$((md) => {
      const startX = md.clientX + window.scrollX,
        startY = md.clientY + window.scrollY,
        startLeft = parseInt(md.target.style.left, 10) || 0,
        startTop = parseInt(md.target.style.top, 10) || 0;

      return this.mouseMove$.map((mm) => {
        mm.preventDefault();

        return {
          left: startLeft + mm.clientX - startX,
          top: startTop + mm.clientY - startY
        };
      }).takeUntil(this.mouseUp$);
    });

    const subscription = mousedrag$.subscribe((pos) => {
      target.style.top = pos.top + 'px';
      target.style.left = pos.left + 'px';
    });*/

  }

  moveTo(dx: number, dy: number) {

    const transform = this.element.nativeElement.style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);
    console.log('before', transform[2]);
    console.log(this.element.nativeElement.parentElement.offsetHeight >= dy + this.element.nativeElement.offsetHeight);

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
    console.log(dy);

    this.element.nativeElement.style.transform = `translate(${dx}px, ${0}px)`;
    //this.element.nativeElement.setAttribute("style", this.CSS.translate(dx, dy));
  }

  @HostListener("mousedown", ['$event']) onMouseUp(event) {

  }

  @HostListener("mouseup", ['$event']) onMouseDown(event: MouseEvent) {
  }

  @HostListener("mousemove", ['$event']) onMouseMove(event: MouseEvent) {

  }
}
