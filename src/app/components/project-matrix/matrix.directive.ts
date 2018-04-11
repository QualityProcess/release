// core
import { Directive, EventEmitter, HostListener, ElementRef, Renderer2, Output, OnInit } from '@angular/core';

@Directive({
  selector: '[moveLeft]'
})
export class MoveLeftDirective implements OnInit {
  private hover: boolean = false;

  private delta: number = 1;
  private interval: any;
  private transform: any

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
   
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover = true;
    this.element.nativeElement.classList.add('mdc-elevation--z14');

    // get current wrapper postion
    this.transform = this.element.nativeElement.parentNode.children[0].style.transform.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);

    let dx = this.transform[1];
    let dy = this.transform[2];

    this.interval = setInterval(() => {
      dx -= this.delta;
      this.element.nativeElement.parentNode.children[0].style.transform = `translate(${dx}px, ${dy}px)`;
    }, 10);
        
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false;
    clearInterval(this.interval);
    this.element.nativeElement.classList.remove('mdc-elevation--z14');
  }
}
