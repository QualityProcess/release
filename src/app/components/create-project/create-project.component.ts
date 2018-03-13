import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  saveProject: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onSaveProject() {
    this.saveProject = !this.saveProject;
  }

}
