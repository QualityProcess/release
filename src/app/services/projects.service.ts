import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Project } from "../models/project";
import { Phases } from "../models/phases";
import { Discipline } from "../models/discipline";
import { DesignStage } from "../models/design-stage";

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects() : Observable<Project[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };

    return this.http.get<any>('https://qualityprocess-development.herokuapp.com/api/v1/projects', httpOptions);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`https://qualityprocess-development.herokuapp.com/api/v1/projects/${id}`);
  }

  getPhases(): Observable<Phases[]> {
    return this.http.get<Phases[]>(`https://qualityprocess-development.herokuapp.com/api/v1/project_phases`);
  }

  getPhasesMatrix(id:number): Observable<any[]>{
    return this.http.get<any>(`https://qualityprocess-development.herokuapp.com/api/v1/project_phases/${id}/matrix`);
  }

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`https://qualityprocess-development.herokuapp.com/api/v1/disciplines`);
  }

  getDescipline(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`https://qualityprocess-development.herokuapp.com/api/v1/disciplines/${id}`);
  }

  getDesignStages(): Observable<DesignStage[]> {
    return this.http.get<DesignStage[]>(`https://qualityprocess-development.herokuapp.com/api/v1/design_stages`);
  }

  getDesignStage(id: number): Observable<DesignStage> {
    return this.http.get<DesignStage>(`https://qualityprocess-development.herokuapp.com/api/v1/design_stages/${id}`);
  }
}
