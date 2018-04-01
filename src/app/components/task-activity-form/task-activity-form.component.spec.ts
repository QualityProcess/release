import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskActivityFromComponent } from './task-activity-from.component';

describe('TaskActivityFromComponent', () => {
  let component: TaskActivityFromComponent;
  let fixture: ComponentFixture<TaskActivityFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskActivityFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskActivityFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
