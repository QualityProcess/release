import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'google-keep-task-view',
  templateUrl: './google-keep-task-view.component.html',
  styleUrls: ['./google-keep-task-view.component.scss']
})
export class GoogleKeepTaskViewComponent implements OnInit {
  displayedColumns = ['name', 'checkedBy', 'checkDate', 'estimate', 'actual']; 
  @Input('data') dataSource;
  constructor() { }

  ngOnInit() {
  }

  formatDate(date): string {
    let dateObj = new Date(date),
      locale = "en-us";

    let month = dateObj.toLocaleString(locale, { month: "long" });
    return `${dateObj.getDay()} ${month}`;
  }

}
