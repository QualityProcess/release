import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loaded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loaded = true;
    console.log('app loaded');
  }
  
}
