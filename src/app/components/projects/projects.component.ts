import { Component, Directive, Inject, OnInit, ViewChild, HostListener, ElementRef, Renderer2, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router, ParamMap } from '@angular/router';
import { Sort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DeleteDialog } from "../dialogs/delete-dialog";
import { ProjectsService } from "../../services";
import { Project } from "../../models/project";
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  sortOption: string;
  sortOptions: string[] = ['name', 'id'];
  sortItems = [
    { sort: 'name', name: 'Name (A to Z)' },
    { sort: 'name-revers', name: 'Name (Z to A)' },
    { sort: 'status-code', name: 'Status code (A to Z)' },
    { sort: 'status-code-revers', name: 'Status code (Z to A)' },
    { sort: 'date', name: 'Date of creation (from early to late)' },
    { sort: 'date-revers', name: 'Date of creation (from late to early)' }
    
  ];
  currentSortItem: string;

  sortedData: any;
  filterData: any;
  viewList: string[] = ['grid', 'list'];
  currentView: string = 'grid';
  loaded = false;
  @ViewChild('cardview') element

  constructor(private service: ProjectsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProjects();
    this.getView();
  }

  getProjects() {
    this.service.getProjects().subscribe(projects => {
      this.loaded = true;
      this.projects = projects;
      this.filterData = projects;
      this.sortData('name');
      console.log(this.filterData);
    });
  }

  formatDate(date) : string {
    let dateObj = new Date(date);
    return `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
  }

  setView(view) {
    this.service.saveProjectView(view);
    this.currentView = view;
  }

  getView() {
    let view = this.service.getProjectView();
    console.log(this.viewList.includes(view));
    console.log(view);
    if (this.viewList.includes(view)) this.currentView = view;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filterData = this.projects.filter((project) => {
      let regExp = new RegExp(filterValue.toString(), 'gi');
      return regExp.test(project.name.toString());
    });
  }

  sortData(name) {
    const data = this.filterData.slice();
    
    console.log('Name:', name);
    this.filterData = data.sort((a, b) => {
      let isAsc = 'asc';
      switch (name) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'name-revers': return compare(a.name, b.name, null);
        case 'date': return compare(a.created_at, b.created_at, isAsc);
        case 'date-revers': return compare(a.created_at, b.created_at, null);
        case 'status-code': return compare(a.status_code, b.status_code, isAsc);
        case 'status-code-revers': return compare(a.status_code, b.status_code, null)
        default: return 0;
      }
    });
  }

  onSelect(project: Project) {
    this.router.navigate(['projects', project.id]);
  }

  openDeleteDialog(project){
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: {
        project: project,
        title: `Delete project ${project.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' ,result);
      if (result) {
        this.delete(project);
      }
    });
  }

  delete(project: Project) {

    this.service.deleteProject(project.id).subscribe( res => {
      this.filterData.find((elem, index) => {

        if (+project.id === +elem.id) {          
          this.filterData.splice(index, 1);
        }
        return project.id === +elem.id;
      })
    });
  }

  goToMatrix(id) {
    this.router.navigate(['projects', id, 'matrix']);
  }

  toggleProject(event, id) {
    console.log(event.srcElement.checked);
  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Directive({
  selector: '[cardview]' 
})
export class CardViewDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
   
  }

  ngAfterContentInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {

    if (!this.element.nativeElement.children[0]) return;
     
    let cardWidthValue = window.getComputedStyle(this.element.nativeElement.children[0], null).width;
    let cardMarginValue = window.getComputedStyle(this.element.nativeElement.children[0], null).marginRight;
    let cardPaddingValue = window.getComputedStyle(this.element.nativeElement.children[0], null).paddingRight;
    let wrapperWidthVvalue = window.getComputedStyle(this.element.nativeElement.parentElement, null).width;

    if (!/px/i.test(cardWidthValue) || !/px/.test(wrapperWidthVvalue) || !/px/.test(cardMarginValue) || !/px/.test(cardPaddingValue)) return;

    let cardWidth = parseInt(cardWidthValue.replace(/px/, ''));
    let cardMargin = parseInt(cardMarginValue.replace(/px/, ''));
    let cardPadding = parseInt(cardPaddingValue.replace(/px/, ''));
    let wrapperWidth = parseInt(wrapperWidthVvalue.replace(/px/, ''));

    let allCardWidth = cardWidth + cardMargin * 2 + cardPadding * 2;


    let columnCount = Math.floor(wrapperWidth / allCardWidth);
    let margin = (wrapperWidth - allCardWidth * columnCount) / 2

    if (isNaN(margin) || wrapperWidth - margin * 2 < allCardWidth) return;

    this.renderer.setAttribute(this.element.nativeElement, "style", `width: ${wrapperWidth - margin * 2}px`);
  }
}

@Directive({ 
  selector: '[hoverElevation]'
})
export class ElevationDirective implements OnInit {
  hover: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover = true;
    this.element.nativeElement.classList.add('mdc-elevation--z14');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false;
    this.element.nativeElement.classList.remove('mdc-elevation--z14');
  }

}


