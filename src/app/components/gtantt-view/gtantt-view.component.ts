import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as google from 'ng2-google-charts';
import * as d3 from 'd3';

@Component({
  selector: 'gtantt-view',
  templateUrl: './gtantt-view.component.html',
  styleUrls: ['./gtantt-view.component.scss']
})
export class GtanttViewComponent implements OnInit {
  @Input('data') dataSource;
  @ViewChild('canvas') canvas;
  date: Date = new Date(2015, 0, 1);
  date1: Date = new Date(2015, 0, 3);
  width: number;
  height: number;
  inputData: any;
  currentData = [];
  data: any;
  constructor() { }

  dataa:any = {
      chartType: 'Gantt',
      dataTable: [
        [['string', 'Task Name'], ['string', 'Resource'], ['date', 'Start Date'], ['date', 'End Date'], ['number', 'Duration'], ['number', 'Percent Complete'], ['string', 'Dependencies']],
        ['Research', 'Find sources',
          new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
        ['Write', 'Write paper',
          null, new Date(2015, 0, 9), this.daysToMilliseconds(3), 25, null],
        ['Cite', 'Create bibliography',
          null, new Date(2015, 0, 7), this.daysToMilliseconds(1), 20, null],
        ['Complete', 'Hand in paper',
          null, new Date(2015, 0, 10), this.daysToMilliseconds(1), 0, null],
        ['Outline', 'Outline paper',
          null, new Date(2015, 0, 6), this.daysToMilliseconds(1), 100, null]
      ],
      options: {
        grantt: {
          arrow: null
        }
      }
  }

  daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
  }

  ngAfterContentInit() {
    console.log(this.canvas.nativeElement.offsetWidth)
    this.drawGraph();
  }

  drawGraph() {
    


    /*var svg = d3.selectAll(".svg")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var data = [{
      startDate: '2017-02-27',
      endDate: '2017-03-04',
      label: 'milestone 01',
      id: 'm01',
      dependsOn: []
    }, {
      startDate: '2017-02-23',
      endDate: '2017-03-01',
      label: 'milestone 01',
      id: 'm06',
      //dependsOn: ['m01']
    }];

    createGanttChart(this.canvas.nativeElement, data, {
      itemHeight: 20,
      svgOptions: {
        width: 1200,
        height: 400,
        fontSize: 12
      }
    });*/
  }


  ngOnInit() {
    console.log(this.dataSource);
    
    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetWidth;

    for (let obj of this.dataSource) {

      this.inputData = {
        input: obj.id,
        data: [
          
        ]
      }
      let granttData1 = [];
      obj.task_activities.forEach((task_activity) => {
        let taskActivityData = {
          taskActivity: task_activity.id,
          resultEstimated: 0,
          resultActivite: 0,
          google: {
            chartType: 'Gantt',
            options: {
              criticalPathEnabled: false,
              width: 1400
              //backgroundColor: { fill: 'transparent' }
            },
            dataTable: [
              
            ]
          }
        }

        let granttData = [];
        
        task_activity.task_activity_items.forEach((task_activity_item) => {
          granttData.push([task_activity_item.name, task_activity_item.name, new Date(task_activity_item.estimated_start), new Date(task_activity_item.estimated_completion), this.daysToMilliseconds(10), 100, null]);
          let dateStart = new Date(task_activity_item.estimated_start);
          let dateEnd = new Date(task_activity_item.estimated_completion);
          let compareDate = new Date(2000, 10, 10);
          if (dateStart > compareDate && dateEnd > compareDate) {
            granttData1.push({
              startDate: new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(), dateStart.getUTCDate()),
              endDate: new Date(dateEnd.getUTCFullYear(), dateEnd.getUTCMonth(), dateEnd.getUTCDate()),
              label: task_activity_item.name,
              id: 'm01',
              dependsOn: []
            });
          }
          
        });

        let resultHours = taskActivityData.resultEstimated - taskActivityData.resultActivite;

        resultHours = resultHours <= 0 ? 0 : taskActivityData.resultEstimated - taskActivityData.resultActivite;

        taskActivityData.google.dataTable = [
          [['string', 'Task Name'], ['string', 'Resource'], ['date', 'Start Date'], ['date', 'End Date'], ['number', 'Duration'], ['number', 'Percent Complete'], ['string', 'Dependencies']],
          ...granttData
        ]


        this.inputData.data.push(taskActivityData);
      })

      let div = document.createElement("div");
      div.classList.add('phase-section');
      let header = document.createElement("div");
      header.classList.add('chart-header');
      let h2 = document.createElement("h2");
      h2.style.color = '#ffffff';
      h2.style.lineHeight = '2em';
      h2.innerHTML = obj.category;
      header.appendChild(h2);
      div.appendChild(header);
      this.canvas.nativeElement.appendChild(div);

      createGanttChart(div, granttData1, {
        itemHeight: 20,
        svgOptions: {
          width: this.width,
          //height: 'auto', 
          fontSize: 12
        }
      });

      this.currentData.push(this.inputData);
    }

    console.log('', this.currentData);

  }


}

function moment(date: any) {
  return new Date(date);
}

var createGanttChart = function (placeholder, data, {
  itemHeight,
  svgOptions
}) {
  // prepare data
  let minStartDate, maxEndDate;

  let margin = (svgOptions && svgOptions.margin) || {
    top: itemHeight * 2,
    left: itemHeight * 2
  };

  let scaleWidth = ((svgOptions && svgOptions.width) || 600);
  let scaleHeight = Math.max((svgOptions && svgOptions.height) || 200, data.length * itemHeight * 2);

  scaleWidth -= margin.left * 2;
  scaleHeight -= margin.top * 2;

  let svgWidth = scaleWidth + (margin.left * 2);
  let svgHeight = scaleHeight + (margin.top * 2);

  let fontSize = (svgOptions && svgOptions.fontSize) || 12;

  data = data.map(function (e) {
    if ((!e.startDate || !e.endDate) && !e.duration) {
      //throw new Exception('Wrong element format: should contain either startDate and duration, or endDate and duration or startDate and endDate');
    }

    if (e.startDate)
      e.startDate = moment(e.startDate);

    if (e.endDate)
      e.endDate = moment(e.endDate);

    if (e.startDate && !e.endDate && e.duration) {
      e.endDate = moment(e.startDate);
      //e.endDate.add(e.duration[0], e.duration[1]);
    }

    if (!e.startDate && e.endDate && e.duration) {
      e.startDate = moment(e.endDate);
      //e.startDate.subtract(e.duration[0], e.duration[1]);
    }

    if (!minStartDate || e.startDate < minStartDate) minStartDate = moment(e.startDate);

    if (!minStartDate || e.endDate < minStartDate) minStartDate = moment(e.endDate);

    if (!maxEndDate || e.endDate > maxEndDate) maxEndDate = moment(e.endDate);

    if (!maxEndDate || e.startDate > maxEndDate) maxEndDate = moment(e.startDate);

    if (!e.dependsOn)
      e.dependsOn = [];

    return e;
  });

  // add some padding to axes
  //minStartDate.subtract(2, 'days');
  //maxEndDate.add(2, 'days');

  let dataCache = data.reduce(function (acc, e) {
    acc[e.id] = e;
    return acc;
  }, {});

  let fillParents = function (eltId, result) {
    dataCache[eltId].dependsOn.forEach(function (parentId) {
      if (!result[parentId])
        result[parentId] = [];

      if (result[parentId].indexOf(eltId) < 0)
        result[parentId].push(eltId);

      fillParents(parentId, result);
    });
  };

  let childrenCache = data.reduce(function (acc, e) {
    if (!acc[e.id])
      acc[e.id] = [];

    fillParents(e.id, acc);
    return acc;
  }, {});

  data = data.sort(function (e1, e2) {
    if (childrenCache[e1.id] && childrenCache[e2.id] && childrenCache[e1.id].length > childrenCache[e2.id].length)
      // if (moment(e1.endDate).isBefore(moment(e2.endDate)))
      return -1;
    else
      return 1;
  });

  // create container element
  let svg = d3.select(placeholder).append('svg').attr('width', svgWidth).attr('height', svgHeight);

  const xScale = d3.scaleTime()
    //.domain([minStartDate.toDate(), maxEndDate.toDate()])
    .domain([new Date(minStartDate), new Date(maxEndDate)])
    .range([0, scaleWidth]);

  const xAxis = d3.axisBottom(xScale).tickArguments([d3.timeDay.every(1)]).tickFormat(d3.timeFormat("%d/%m"));

  const g1 = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const linesContainer = g1.append('g').attr('transform', `translate(0,${margin.top})`);
  const barsContainer = g1.append('g').attr('transform', `translate(0,${margin.top})`);

  g1.append('g').call(xAxis);

  let rectangleData = data.map(function (d, i) {
    //let x = xScale(d.startDate.toDate());
    //let xEnd = xScale(d.endDate.toDate());
    let x = xScale(new Date(d.startDate));
    let xEnd = xScale(new Date(d.endDate));

    let y = i * itemHeight * 1.5;
    let width = xEnd - x;
    let height = itemHeight;

    let label = d.label;
    let charWidth = (width / fontSize);
    let dependsOn = d.dependsOn;
    let id = d.id;

    let tooltip = d.label;

    let singleCharWidth = fontSize * 0.5;
    let singleCharHeight = fontSize * 0.45;

    if (label.length > charWidth) {
      label = label.split('').slice(0, charWidth - 3).join('') + '...';
    }

    let labelX = x + ((width / 2) - ((label.length / 2) * singleCharWidth));
    let labelY = y + ((height / 2) + (singleCharHeight));

    return {
      x,
      y,
      xEnd,
      width,
      height,
      id,
      dependsOn,
      label,
      labelX,
      labelY,
      tooltip
    };
  });

  // create axes
  let bars = barsContainer
    .selectAll('g')
    .data(rectangleData)
    .enter()
    .append('g');

  // prepare dependencies polyline data
  let cachedData = rectangleData.reduce((acc, e) => {
    acc[e.id] = e;
    return acc;
  }, {});

  let cachedIds = rectangleData.map(e => e.id);

  let storedConnections = rectangleData.reduce((acc, e) => { acc[e.id] = 0; return acc }, {});

  let polylineData = rectangleData.reduce(function (acc: any, d: any) {
    return acc.concat(
      d.dependsOn
        .map(parentId => cachedData[parentId])
        .map(function (parent) {
          let points = [],
            color = '#' + (Math.max(0.1, Math.min(0.9, Math.random())) * 0xFFF << 0).toString(16);

          storedConnections[parent.id]++;
          storedConnections[d.id]++;

          let deltaParentConnections = storedConnections[parent.id] * (itemHeight / 4);
          let deltaChildConnections = storedConnections[d.id] * (itemHeight / 4);

          if (true) { // cachedIds.indexOf(parent.id) < cachedIds.indexOf(d.id)) {
            // if parent is right above the current bar - put four points at different heights
            points = [
              d.x, (d.y + (itemHeight / 2)),
              d.x - deltaChildConnections, (d.y + (itemHeight / 2)),
              d.x - deltaChildConnections, (d.y - (itemHeight * 0.25)),
              parent.xEnd + deltaParentConnections, (d.y - (itemHeight * 0.25)),
              parent.xEnd + deltaParentConnections, (parent.y + (itemHeight / 2)),
              parent.xEnd, (parent.y + (itemHeight / 2))
            ];
          } else {
            // otherwise - use three points

           /* points = [
              d.x, (d.y + (itemHeight / 2)),
              d.x - deltaChildConnections, (d.y + (itemHeight / 2)),
              parent.xEnd + deltaParentConnections, (d.y + (itemHeight / 2)),
              parent.xEnd + deltaParentConnections, (parent.y + (itemHeight / 2)),
              parent.xEnd, (parent.y + (itemHeight / 2))
            ];*/
          }

          return {
            points: points.join(','),
            color: color
          };
        })
    );
  }, []);

  let lines = linesContainer
    .selectAll('polyline')
    .data(polylineData)
    .enter()
    .append('polyline')
    .style('fill', 'none')
    .style('stroke', (d: any) => d.color)
    .attr('points', (d: any) => d.points);

  bars
    .append('rect')
    //.attr('rx', itemHeight / 2)
    //.attr('ry', itemHeight / 2)
    .attr('x', (d: any) => d.x)
    .attr('y', (d: any) => d.y)
    .attr('width', (d: any) => d.width)
    .attr('height', (d: any) => d.height)
    .style('fill', '#ffffff')
    .style('stroke', '#48a999');

  bars
    .append('text')
    .style('stroke', '#000000')
    .attr('x', (d: any) => d.labelX)
    .attr('y', (d: any) => d.labelY)
    .text((d: any) => d.label);

  bars
    .append('title')
    .text((d: any) => d.tooltip);
};


function ganttTickFunc(t0, t1, step) {
  var startTime = new Date(t0),
    endTime = new Date(t1), times = [];
  endTime.setUTCDate(endTime.getUTCDate() + 1);
  while (startTime < endTime) {
    startTime.setUTCDate(startTime.getUTCDate() + 2);
    times.push(new Date(startTime));
  }
  return times;
}
