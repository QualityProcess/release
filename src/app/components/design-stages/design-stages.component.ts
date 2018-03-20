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
      this.designStages = designStages;
      this.filterData = designStages;

      console.log(designStages);
    });
  }

  applyFilter(filterValue) {
    if (typeof filterValue === 'undefined') return;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.designStages.filter((descipline) => {
      let regExp = new RegExp(filterValue.toString(), 'gi');
      return regExp.test(descipline.category.toString());
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
