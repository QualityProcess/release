// core
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-access-fail',
  templateUrl: './access-fail.component.html',
  styleUrls: ['./access-fail.component.scss']
})
export class AccessFailComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
    this._location.back();
  }

}
