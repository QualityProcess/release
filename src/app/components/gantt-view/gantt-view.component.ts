import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as google from 'ng2-google-charts';
import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from "../../services/task.service";
import { ProjectsService } from "../../services";

// models
import { TaskPhase } from "../../models/task-phase";
import { TaskActivity } from "../../models/task-activity";
import { TaskActivityItem } from "../../models/task-activity-item";

let minStartDate: Date;
let maxEndDate: Date;

@Component({
  selector: 'gantt-view',
  templateUrl: './gantt-view.component.html',
  styleUrls: ['./gantt-view.component.scss']
})
export class GanttViewComponent implements OnInit {
  @ViewChild('canvas') canvas;
  public phases: TaskPhase[];
  public taskActivities: TaskActivity[];
  public taskActivityItems: TaskActivityItem[];
  private subscribe: any;

  width: number;
  height: number;
  inputData: any;
  currentData = [];
  data: any;
  loaded: boolean = false;

  constructor(private service: TaskService,
    private projectService: ProjectsService,
    private route: ActivatedRoute) { }

  daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
  }

  ngAfterContentInit() { }

  ngOnInit() {

    this.getPhases();
    
    //this.getTask(); 
  }

  getPhases() {
    let id;
    this.route.parent.parent.params.subscribe(params => {
      console.log(params);
      this.service.getTask(+params["task_id"]).subscribe(res => {
        this.data = res;

        console.log(this.data);
        this.updateData();
      })
    });
  }

  initGantt() {
    console.log(this.data);

    this.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.offsetWidth;

    for (let obj of this.data) {

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

        task_activity.task_activity_items.sort(function (a, b) {
          return a.sort - b.sort;
        });

        task_activity.task_activity_items.forEach((task_activity_item) => {
          granttData.push([task_activity_item.name, task_activity_item.name, new Date(task_activity_item.estimated_start), new Date(task_activity_item.estimated_completion), this.daysToMilliseconds(10), 100, null]);
          let dateStart = new Date(task_activity_item.estimated_start);
          let dateEnd = new Date(task_activity_item.estimated_completion);
          let compareDate = new Date(2000, 10, 10);
          if (dateStart > compareDate && dateEnd > compareDate) {
            granttData1.push({
              startDate: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()),
              endDate: new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()),
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
      div.classList.add('mat-elevation-z8');
      let header = document.createElement("div");
      header.classList.add('chart-header');
      let h2 = document.createElement("h2");
      h2.innerHTML = obj.category;
      header.appendChild(h2);
      div.appendChild(header);
      this.canvas.nativeElement.appendChild(div);

      console.log(granttData1);

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

  updateData() {

    if (this.subscribe) this.subscribe.unsubscribe();

    // get phases
    this.phases = this.data.task_phases.sort(function (a, b) {
      return a.sort - b.sort;
    });

    console.log("PHASES:", this.phases);

    let phaseIds = this.phases.map(phase => phase.id);

    if (phaseIds.length === 0) this.loaded = true;

    let allActivitiesByPhasesSubcribe = this.getAllActivitiesByPhases(phaseIds).subscribe(res => {
      this.taskActivities = [];
      this.taskActivities = this.taskActivities.concat(...res);

      if (this.taskActivities.length === 0) this.loaded = true;
      console.log(res);
      this.taskActivities.sort(function (a, b) {
        return a.sort - b.sort;
      });

      let activityIds = this.taskActivities.map(activity => activity.id);

      console.log("(this.taskActivities:", this.taskActivities);

      this.getAllActivityItemsByActivities(activityIds).subscribe(res => {
        this.taskActivityItems = [];
        console.log(res);
        this.taskActivityItems = this.taskActivityItems.concat(...res);

        this.taskActivityItems.sort(function (a, b) {
          return a.sort - b.sort;
        });

        this.taskActivityItems.forEach((item, index, array) => {

          let dateStart = new Date(item.estimated_start);
          let dateEnd = new Date(item.estimated_completion);
          let compareDate = new Date(2000, 10, 10);
          if (dateStart > compareDate && dateEnd > compareDate) {
            if (!minStartDate || dateStart < minStartDate) minStartDate = moment(dateStart);

            if (!minStartDate || dateEnd < minStartDate) minStartDate = moment(dateEnd);

            if (!maxEndDate || dateEnd > maxEndDate) maxEndDate = moment(dateEnd);

            if (!maxEndDate || dateStart > maxEndDate) maxEndDate = moment(dateStart);
          }

         
        });

        console.log("(this.taskActivity Items:", this.taskActivityItems);

        // load data completed
        this.loaded = true;

        this.getTask(); 
      });

    });

  }

  getTask() {
    this.loaded = true;
    let id;
    this.route.parent.parent.params.subscribe(params => {
      console.log(params);
      this.service.getTask(+params["task_id"]).subscribe(res => {
        this.data = res;

        console.log(this.data);
        let response$ = forkJoin(this.service.getTaskActivities(), this.service.getTaskActivityItems());

        response$.subscribe(result => {

          this.data.task_phases.sort(function (a, b) {
            return a.sort - b.sort;
          });

          this.data.task_phases.forEach((taksPhase, index, taskPhases) => {

            taskPhases[index].task_activities = result[0].filter(item => {
              return item.task_phase_id == taskPhases[index].id;
            });

            taskPhases[index].task_activities.sort(function (a, b) {
              return a.sort - b.sort;
            });

            taskPhases[index].task_activities.forEach((task_activity, i, task_activities) => {
              task_activities[i].task_activity_items = result[1].filter(item => {
                return item.task_activity_id == task_activities[i].id;
              });

              task_activities[i].task_activity_items = task_activities[i].task_activity_items.sort(function (a, b) {
                return a.sort - b.sort;
              });

            });

          });

          this.data = this.data.task_phases;

          this.initGantt();
        });
      });
    });
  }

  getAllActivitiesByPhases(phaseIds: number[]) {
    let activitiesObservable: Observable<TaskActivity[]>[] = [];
    phaseIds.forEach(id => {
      activitiesObservable.push(this.service.getTaskActivitiesByPhase(+id));
    });

    return forkJoin(...activitiesObservable);
  }

  getAllActivityItemsByActivities(activityIds: number[]) {
    let activityItemsObservable: Observable<TaskActivityItem[]>[] = [];
    activityIds.forEach(id => {
      activityItemsObservable.push(this.service.getTaskActivityItemsByActivity(+id));
    });

    return forkJoin(...activityItemsObservable);
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
  //let minStartDate, maxEndDate;

  var myTool = d3.select("body")
    .append("div")
    .attr("class", "mytooltip")
    .style("opacity", "0")
    .style("fill", "#000")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("display", "none");


  let margin = (svgOptions && svgOptions.margin) || {
    top: itemHeight * 2,
    left: itemHeight * 2
  };

  let scaleWidth = ((svgOptions && svgOptions.width) || 600);

  let scaleHeight = Math.max((svgOptions && svgOptions.height) || 250, data.length * itemHeight * 2);

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
      return 1;
    else
      return -1;
  });

  // create container element
  let svg = d3.select(placeholder).append('svg').attr('width', svgWidth).attr('height', svgHeight);

  /*const xScale = d3.scaleTime()
    //.domain([minStartDate.toDate(), maxEndDate.toDate()])
    .domain([new Date(minStartDate), new Date(maxEndDate)])
    .range([0, scaleWidth]);*/

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
    .style('fill', '#008081')
    .style('cursor', 'pointer')
    .style('stroke', '#008081');

  bars.on("mouseover", (d) => {  //Mouse event

<<<<<<< HEAD
    //Container for the gradients
=======
    /*//Container for the gradients
>>>>>>> dev
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3.5")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
<<<<<<< HEAD
      .attr("in", "SourceGraphic");
=======
      .attr("in", "SourceGraphic");*/
>>>>>>> dev

    /*d3.select(this).select('rect')
      .style("filter", "url(#glow)");*/


    /*let xPos = d3.select(this).select('rect').attr("x");
    let yPos = d3.select(this).select('rect').attr("y");
    let tooltip = d3.select(this)
      .append('g');
    

    let tooltopLabel = tooltip.append('text')
      .attr('x', (d: any) => xPos)
      .attr('y', (d: any) => +yPos - 50)
      .text((d: any) => d.tooltip)
      .attr("fill", "#000")
      .attr("text-anchor", "middle")
      .style("z-index", "91");


    var path = tooltip.append("path")
      .data(rectangleData)
      .enter()
      .attr("d", (bbox: any) => `M${bbox.x} ${bbox.y} H ${bbox.x + bbox.width} V ${bbox.y + bbox.height} H${bbox.x + bbox.width / 2} L${bbox.x} ${bbox.y + 50} L${bbox.x + bbox.width / 4}  ${bbox.y + bbox.height} H${bbox.x} L ${bbox.x} ${bbox.y} `)
      .style("z-index", "90")
      .style("fill", "#fff")
      .style("stroke", "#666")
      .style("stroke-width", "1.5px");

    var rect = tooltip.append("rect")
      .attr("x", bbox.x)
      .attr("y", bbox.y)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      .style("z-index", "90")
      .style("fill", "#fff")
      .style("stroke", "#666")
      .style("stroke-width", "1.5px");*/

    /*d3.select(this)
      .transition()
      .duration(500)
      .attr("x", function (d) { return -30; })
      .style("cursor", "pointer")
      .attr("width", 60)
    myTool
      .transition()  //Opacity transition when the tooltip appears
      .duration(500)
      .style("opacity", "1")
      .style("display", "block")  //The tooltip appears

    myTool
      .html(
      "<div id='thumbnail'><span>" + polylineData.tooltip + "</span></div>")
      .style("left", (d3.event.pageX - 50) + "px")
      .style("top", (d3.event.pageY - 50) + "px")*/
  })
    .on("mouseout", function (d) {  //Mouse event

      /*d3.select(this)
        .style("filter", "none");*/

      //d3.select(this).select('g').remove();

      /*d3.select(this)
        .transition()
        .duration(500)
        .attr("x", function (d) { return -20; })
        .style("cursor", "normal")
        .attr("width", 40)
      myTool
        .transition()  //Opacity transition when the tooltip disappears
        .duration(500)
        .style("opacity", "0")
        .style("display", "none")  //The tooltip disappears*/
    });

  bars
    .append('text')
    .style('stroke', '#ffffff')
    .style('font-family', '"Roboto Thin", "Roboto", "Helvetica Neue", "Arial", sans-serif!important')
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
  endTime.setDate(endTime.getDate());
  while (startTime < endTime) {
    startTime.setDate(startTime.getDate());
    times.push(new Date(startTime));
  }
  return times;
}

