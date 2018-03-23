import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { GoogleChartComponent } from 'ng2-google-charts';

import * as d3 from 'd3';

@Component({
  selector: 'horizontal-histogram',
  templateUrl: './horizontal-histogram.component.html',
  styleUrls: ['./horizontal-histogram.component.scss']
})
export class HorizontalHistogramComponent implements OnInit {
  @Input('data') dataSource;
  viewData: any;
  @ViewChild('bar-graph') bar: any;

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

  ngOnInit(){}

  ngAfterContentInit() {
    this.renderGraph();
  }

  renderGraph() {
    var data = [30, 86, 168, 281, 303, 365];

    var scale = d3.scaleLinear()
      .domain([0, 365])
      .range([0, 300]);

    d3.select(".bar-chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function (d) { return scale(d) + 'px' })
      .text(function (d) { return '$ ' + d; });
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
