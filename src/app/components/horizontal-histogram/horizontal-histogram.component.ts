import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { GoogleChartComponent } from 'ng2-google-charts';

@Component({
  selector: 'horizontal-histogram',
  templateUrl: './horizontal-histogram.component.html',
  styleUrls: ['./horizontal-histogram.component.scss']
})
export class HorizontalHistogramComponent implements OnInit {
  @Input('data') dataSource;
  viewData: any;

  @ViewChild('your_chart') chart: GoogleChartComponent;
  pieChartData = {
    chartType: 'BarChart',
    dataTable: [
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
        'Western', 'Literature', { role: 'annotation' }],
      ['2010', 10, 24, 20, 32, 18, 5, ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, '']
    ],
    options: {
      width: 600,
      height: 400,
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: true},
  }; 
  
  constructor() { }

  ngOnInit() {
    
  }

  getData(data) {
    return {
      chartType: 'BarChart',
      dataTable: [
        ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
          'Western', 'Literature', { role: 'annotation' }],
        ['2010', 10, 24, 20, 32, 18, 5, '']
      ],
      options: {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
      },
    }; 
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    // console.log(event.target.innerWidth);
    // Make sure you don't call redraw() in ngOnInit()
    //   - chart would not be initialised by that time, and
    //   - this would cause chart being drawn twice
    this.chart.redraw();
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

}
