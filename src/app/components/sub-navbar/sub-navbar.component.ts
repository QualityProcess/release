import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.scss']
})
export class SubNavbarComponent implements OnInit {
  @Input() title: string = '';
  @Input() classes: string = '';

  constructor() { }

  ngOnInit() {
  }

}
