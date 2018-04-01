import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BreadCrumb } from './../models/breadcrumb';

@Injectable()
export class BreadCrumbsService {
  public breadcrumbs: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>(null);

  setBreadcrumbs(value: BreadCrumb[]) {
    this.breadcrumbs.next(value);
  }
}
