import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap } from '@angular/router';
import { ProjectsService } from "../../services";
import { DesignStage } from "../../models/design-stage";

@Component({
  selector: 'design-stages',
  templateUrl: './design-stages.component.html',
  styleUrls: ['./design-stages.component.scss']
})
export class DesignStagesComponent implements OnInit {
  loaded = false;
  designStages: DesignStage[];
  filterData: DesignStage[];
  gridView: boolean = true;
  @Input('disciplineId') disciplineId: number;
  constructor(private service: ProjectsService, private router: Router) { }

  ngOnInit() {
    this.getDesignStages();
  }

  getDesignStages() {
    this.service.getDesignStages().subscribe(designStages => {
      this.loaded = true;
      designStages = designStages.filter((designStage) => {
        return designStage.discipline_id === this.disciplineId;
      });
      this.designStages = designStages;
      this.filterData = designStages;

      console.log(designStages);
    });
  }

  onSelect(designStage: DesignStage) {
    /*this.router.navigate(['disciplines', designStage.id]);*/
  }

  toogleView(view) {
    this.gridView = view === 'list' ? false : true;
  }

  toggleDesignStage(event, id) {
    console.log(event.srcElement.checked);
  }

  goToMatrix(id) {
    this.router.navigate(['tasks', 1]);
  }
}
