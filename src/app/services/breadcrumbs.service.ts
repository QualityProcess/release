import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BreadCrumb } from './../models/breadcrumb';

@Injectable()
export class BreadCrumbsService {
  public breadcrumbs: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>(null);
  private _currentProjectUrl: string;

  setBreadcrumbs(value: BreadCrumb[]) {
    this.breadcrumbs.next(value);
  }

  set currentProjectUrl(projectUrl: string) {
    console.log("set projectUrl: ", projectUrl);
    this._currentProjectUrl = projectUrl;
  }

  get currentProjectUrl(): string {
    console.log("get projectUrl: ", this._currentProjectUrl);
    return this._currentProjectUrl;
  }
}
