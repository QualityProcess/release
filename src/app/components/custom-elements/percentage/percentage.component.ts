import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})
export class PercentageComponent implements OnInit {
  @Input('data') percentage: number;

  constructor() { }

  ngOnInit() { }

}
