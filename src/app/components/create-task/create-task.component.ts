import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Project } from '../../models/project';
import { Discipline } from '../../models/discipline';
import { DesignStage } from '../../models/design-stage';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  saveTask: boolean = false;
  projects: Project[];
  disciplines: Discipline[];
  designStages: DesignStage[];
  currentDisciplineId: number;
  currentDesignStageId: number;
  currentProjectId: number

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['discipline'] && params['designStage'] && params['projectId']) {
        this.currentDisciplineId = parseInt(params['discipline']);
        this.currentDesignStageId = parseInt(params['designStage']);
        this.currentProjectId = parseInt(params['projectId']);
      }
    });
  }

  ngOnInit() {

    this.projects = this.route.snapshot.data.projectsData;
    this.disciplines = this.route.snapshot.data.disciplinesData;
    this.designStages = this.route.snapshot.data.designStagesData;
  }

  onSaveTask() {
    this.saveTask = !this.saveTask;
  }

}
