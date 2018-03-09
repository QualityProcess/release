import { Component, OnInit } from '@angular/core';
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
export class DisciplinesComponent implements OnInit {
  loaded = false;
  disciplines: Discipline[];
  filterData: Discipline[];
  gridView: boolean = true;

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

}
