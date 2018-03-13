import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { DesignStage } from '../../models/design-stage';

@Component({
  selector: 'edit-design-stage',
  templateUrl: './edit-design-stage.component.html',
  styleUrls: ['./edit-design-stage.component.scss']
})
export class EditDesignStageComponent implements OnInit {
  designStage: DesignStage;
  saveDesignStage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService) { }

  ngOnInit() {
    this.designStage = this.route.snapshot.data.designStageData;
  }

  onSaveDesignStage() {
    this.saveDesignStage = !this.saveDesignStage;
  }

}
