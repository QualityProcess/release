import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Task } from "../models/task";

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`https://qualityprocess-development.herokuapp.com/api/v1/tasks/${id}/tasksheet`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`https://qualityprocess-development.herokuapp.com/api/v1/tasks/1/tasksheet`);
  }

}
