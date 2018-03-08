import { Component, OnInit, Input } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { ProjectsService } from "../../services";
import { Phases } from "../../models/phases";

@Component({
  selector: 'phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
  phases: Phases[];
  @Input('projectId') projectId: number;
  constructor(private service: ProjectsService, private router: Router) { }

  ngOnInit() {
    this.service.getPhases().subscribe(phases => {
      this.phases = phases.filter((phase) => {
        return phase.project_id === this.projectId;
      });
    });
  }

  goToMatrix(phaseId) {
    this.router.navigate(['phases', phaseId, 'matrix']);
  }

}
