import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent implements OnInit {
  discipline: Discipline;
  saveDiscipline: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService) { }

  ngOnInit() {
    this.discipline = this.route.snapshot.data.disciplineData;
  }

  onSaveDiscipline() {
    this.saveDiscipline = !this.saveDiscipline;
  }

}
