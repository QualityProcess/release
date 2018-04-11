import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'qp-select',
  templateUrl: './qp-select.component.html',
  styleUrls: ['./qp-select.component.scss']
})
export class QpSelectComponent implements OnInit {

  public active: boolean = false;
  public currentLabel: string = "Sort by";
  @Input() placeholder: string;
  @Input() bindValue: string;
  @Input() bindLabel: string;
  @Input() items: string[];
  @Output() change = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.currentLabel = this.placeholder;
  }

  toggleActive() {
    this.active = !this.active;
  }

  onChanged(item) {
    console.log(item);
    this.currentLabel = item[this.bindLabel];
    this.change.emit(item);
  }

}
