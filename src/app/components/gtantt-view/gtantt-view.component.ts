import { Component, OnInit, Input } from '@angular/core';
import * as google from 'ng2-google-charts';

@Component({
  selector: 'gtantt-view',
  templateUrl: './gtantt-view.component.html',
  styleUrls: ['./gtantt-view.component.scss']
})
export class GtanttViewComponent implements OnInit {
  @Input('data') dataSource;
  date: Date = new Date(2015, 0, 1);
  date1: Date = new Date(2015, 0, 3);
  constructor() { }

  dataa:any = {
      chartType: 'Timeline',
      dataTable: [
        ['Name', 'From', 'To'],
        ['Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)]
      ],
      options: {
        width: 400,
        height: 40,
        legend: { position: 'top', maxLines: 5 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        backgroundColor: { fill: 'transparent' }
      }
  }

  ngOnInit() {


  }


}
