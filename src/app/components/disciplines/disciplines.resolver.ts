import { Injectable, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Discipline } from '../../models/discipline';
import { Observable } from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class DisciplinesResolver implements Resolve<any> {
  constructor(private service: ProjectsService, private router: Router) { }

  resolve() {

    return this.service.getDisciplines().catch(err => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/projects']); // could redirect to error page
        return empty<Discipline[]>();
      });
    
  }
}

