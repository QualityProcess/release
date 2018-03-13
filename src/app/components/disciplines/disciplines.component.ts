import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap } from '@angular/router';
import { ProjectsService } from "../../services";
import { Discipline } from "../../models/discipline";

@Component({
  selector: 'disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit, OnChanges {
  loaded = false;
  disciplines: Discipline[];
  filterData: Discipline[];
  gridView: boolean = true;
  @Input('filter') filterValue: string;

  constructor(private service: ProjectsService, private router: Router) { }

  ngOnInit() {
    this.getDisciplines();
  }

  getDisciplines() {
    this.service.getDisciplines().subscribe(disciplines => {
      this.loaded = true;
      disciplines = disciplines.filter((disc) => {
        return disc.project_phase_id === 1;
      });
      this.disciplines = disciplines;
      this.filterData = disciplines;

      console.log(disciplines);
    });
  }

  onSelect(discipline: Discipline) {
    this.router.navigate(['disciplines', discipline.id]);
  }

  toogleView(view) {
    this.gridView = view === 'list' ? false : true;
  }

  toggleDiscipline(event, id) {
    console.log(event.srcElement.checked);
  }

  applyFilter() {
    if (typeof this.filterValue === 'undefined') return;

    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.disciplines.filter((descipline) => {
      let regExp = new RegExp(this.filterValue.toString(), 'gi');
      return regExp.test(descipline.category.toString());
    });
  }

  ngOnChanges(changes) {
    console.log('discipline Value: ', this.filterValue);
    this.applyFilter();
    
  }

}
