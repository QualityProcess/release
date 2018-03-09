import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap } from '@angular/router';
import { Sort } from '@angular/material';

import { ProjectsService } from "../../services";
import { Project } from "../../models/project";
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  sortOption: string;
  sortOptions: string[] = ['name', 'id'];
  sortedData: any;
  filterData: any;
  gridView: boolean = true;
  loaded = false;

  constructor(private service: ProjectsService, private router: Router) { }

  ngOnInit() {
      this.getProjects();
  }

  getProjects() {
    this.service.getProjects().subscribe(projects => {
      this.loaded = true;
      this.projects = projects;
      this.filterData = projects;
    });
  }

  formatDate(date) : string {
    let dateObj = new Date(date);
    return `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  }

  toogleView(view) {
    this.gridView = view === 'list' ? false : true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.projects.filter((project) => {
      let regExp = new RegExp(filterValue.toString(), 'gi');
      return regExp.test(project.name.toString());
    });
  }

  sortData(name) {
    name = name.srcElement.value;
    console.log(name); 
    const data = this.filterData.slice();
    

    this.filterData = data.sort((a, b) => {
      let isAsc = 'asc';
      switch (name) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc)
        default: return 0;
      }
    });
  }

  onSelect(project: Project) {
    this.router.navigate(['projects', project.id]);
  }

  goToMatrix(id) {
    this.router.navigate(['phases', id, 'matrix']);
  }

  toggleProject(event, id) {
    console.log(event.srcElement.checked);
  } 

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
