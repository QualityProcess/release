import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-project-matrix',
  templateUrl: './project-matrix.component.html',
  styleUrls: ['./project-matrix.component.scss']
})
export class ProjectMatrixComponent implements OnInit {
  data: any;
  constructor(private service: ProjectsService, private route: ActivatedRoute,) {
    route.params.subscribe(({ id }) => {
      service.getPhasesMatrix(+id).subscribe(data => {
        this.data = data;
      });
    });
  }

  ngOnInit() {

  }

}
