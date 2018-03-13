import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { DesignStage } from '../../models/design-stage';

@Component({
  selector: 'design-stage',
  templateUrl: './design-stage.component.html',
  styleUrls: ['./design-stage.component.scss']
})
export class DesignStageComponent implements OnInit {

  designStage: DesignStage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) { }

  ngOnInit() {
    this.designStage = this.route.snapshot.data.designStageData;
  }

}
