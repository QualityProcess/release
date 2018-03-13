import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.scss']
})
export class CreateDisciplineComponent implements OnInit {
  saveDiscipline: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onSaveDiscipline() {
    this.saveDiscipline = !this.saveDiscipline;
  }

}
