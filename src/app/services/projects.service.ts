import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { isPlatformServer, isPlatformBrowser } from '@angular/common';


import { Project } from "../models/project";
import { Phases } from "../models/phases";
import { Discipline } from "../models/discipline";
import { DesignStage } from "../models/design-stage";

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectsService {
  private apiUrl: string = 'https://afternoon-bastion-71141.herokuapp.com/api/v1';  // API URL

  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    @Inject('localStorage') private localStorage: any,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.handleError = httpErrorHandler.createHandleError('ProjectsService');
  }

  getProjects() : Observable<Project[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };

    //return this.http.get<any>('https://qualityprocess-development.herokuapp.com/api/v1/projects', httpOptions);
    return this.http.get<any>(`${this.apiUrl}/projects`, httpOptions);
    
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };

    return this.http.post<Project>(`${this.apiUrl}/projects`, project, httpOptions)
      .pipe(
      catchError(this.handleError('addProject', project))
      );
  }

  updateProject(project: Project, id: number): Observable<Project> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Origin': 'http://localhost:4200',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': 'authkey',
          'userid': '1',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Method': 'PUT'
        })
      };

    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, JSON.stringify(project), httpOptions)
        .pipe(
        catchError(this.handleError('editProject', project))
        );
  }

  deleteProject(id: number): Observable<{}> {
    const httpOptions = {
        headers: new HttpHeaders({
          //'Access-Control-Allow-Origin': 'http://localhost:4200',
          //'Origin': 'http://localhost:4200', 
          'Content-Type': 'application/json',
          //'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'authkey',
          'userid': '1',
          //'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          //'Method': 'PUT' 
        })
      };

    return this.http.delete(`${this.apiUrl}/projects/${id}`, httpOptions)
        .pipe(
        catchError(this.handleError('deleteProject', id))
        );
  }

  getPhases(): Observable<Phases[]> {
    return this.http.get<Phases[]>(`https://qualityprocess-development.herokuapp.com/api/v1/project_phases`);
  }

  getProjectMatrix(id:number): Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/projects/${id}/matrix`);
  }

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.apiUrl}/disciplines`);
  }

  getDescipline(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${this.apiUrl}/disciplines/${id}`);
  }

  getDesignStages(): Observable<DesignStage[]> {
    return this.http.get<DesignStage[]>(`${this.apiUrl}/design_stages`);
  }

  getDesignStage(id: number): Observable<DesignStage> {
    return this.http.get<DesignStage>(`${this.apiUrl}/design_stages/${id}`);
  }

  saveProjectView(view: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('projectsView', JSON.stringify({ projectsView: view }));
    }
  }

  getProjectView(): string {

    if (isPlatformBrowser(this.platformId) && localStorage.getItem("projectsView") !== null) { 
      let view = JSON.parse(localStorage.getItem('projectsView'));
      return view.projectsView;
    }

  }
}
