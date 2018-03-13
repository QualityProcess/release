import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-create-design-stage',
  templateUrl: './create-design-stage.component.html',
  styleUrls: ['./create-design-stage.component.scss']
})
export class CreateDesignStageComponent implements OnInit {
  saveDesignStage: boolean = false;
  discipline: Discipline;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.discipline = this.route.snapshot.data.disciplineData;
    console.log('this.discipline: ', this.discipline);
  }

  onSaveDesignStage() {
    this.saveDesignStage = !this.saveDesignStage;
    
  }

}
