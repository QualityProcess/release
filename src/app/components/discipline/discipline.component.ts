import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline;
  filterValue: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) { }

  ngOnInit() {
    this.discipline = this.route.snapshot.data.disciplineData;
  }

  setFilter(filterValue: string) {
    this.filterValue = typeof this.filterValue === 'undefined' ? '' : filterValue;
  }

}
