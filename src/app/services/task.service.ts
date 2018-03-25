import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";

import { Task } from "../models/task";
import { TaskActivity } from "../models/task-activity";
import { TaskActivityItem } from "../models/task-activity-item";
import { TaskPhase } from "../models/task-phase";

@Injectable()
export class TaskService {
  private apiUrl: string = 'https://afternoon-bastion-71141.herokuapp.com/api/v1';  // API URL

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task); 
  }

  updateTask(task: Task, id): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  // task Phases

  getPhases(): Observable<TaskPhase[]>{
    return this.http.get<TaskPhase[]>(`${this.apiUrl}/task_phases`);
  }

  // task activities

  getTaskActivities(): Observable<TaskActivity[]>{
    return this.http.get<TaskActivity[]>(`${this.apiUrl}/task_activities`);
  }

  getTaskActivity(id: number): Observable<TaskActivity> {
    return this.http.get<TaskActivity>(`${this.apiUrl}/task_activities/${id}`);
  }

  addTaskActivity(taskActivity: TaskActivity): Observable<TaskActivity> {
    return this.http.post<TaskActivity>(`${this.apiUrl}/task_activities/`, taskActivity);
  }

  updateTaskActivity(taskActivity: TaskActivity, id: number): Observable<TaskActivity> {
    return this.http.put<TaskActivity>(`${this.apiUrl}/task_activities/${id}`, taskActivity);
  }

  deleteTaskActivity(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/task_activities/${id}`);
  }

  // task activity items

  getTaskActivityItems(): Observable<TaskActivityItem[]>{
    return this.http.get<TaskActivityItem[]>(`${this.apiUrl}/task_activity_items`);
  }

  addTaskActivityItem(taskActivityItem: TaskActivityItem): Observable<TaskActivityItem> {
    return this.http.post<TaskActivityItem>(`${this.apiUrl}/task_activity_items/`, taskActivityItem);
  }

  updateTaskActivityItem(taskActivityItem: Object, id: number): Observable<TaskActivityItem> {
    return this.http.put<TaskActivityItem>(`${this.apiUrl}/task_activity_items/${id}`, taskActivityItem);
  }

  deleteTaskActivityItem(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/task_activity_items/${id}`); 
  }
}
