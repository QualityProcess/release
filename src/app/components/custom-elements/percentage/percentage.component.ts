import { Component, OnInit, Input, Output, EventEmitter, Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent implements OnInit {
  @Input('data') percentage: number;
  tmpPercentage: number;
  @Output() onChanged = new EventEmitter<number>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.tmpPercentage = this.percentage;
  }

  changed(value) {
    if (value < this.tmpPercentage) return;

    this.percentage = value;
  }

  setPercentage(value) {
    console.log('Set percentage: ', value);
    this.tmpPercentage = value;
    this.percentage = value;
    this.onChanged.emit(this.percentage);
  }
}

@Directive({
  selector: '[persentage]'
})
export class PersentageDirective {
  @Input('persentage') data: number;
  @Output() onChanged = new EventEmitter<number>();
  constructor(private element: ElementRef, private renderer: Renderer2) {

    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }

  @HostListener("mouseenter", ['$event']) onMouseEnter() {
    this.element.nativeElement.classList.add("chosed");
    this.onChanged.emit(this.element.nativeElement.dataset.value);
  }

  @HostListener("mouseleave", ['$event']) onMouseLeave() {
    this.element.nativeElement.classList.remove("chosed");
    this.onChanged.emit(this.data);
  }



}
