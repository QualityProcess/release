import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskActivityComponent } from './edit-task-activity.component';

describe('EditTaskActivityComponent', () => {
  let component: EditTaskActivityComponent;
  let fixture: ComponentFixture<EditTaskActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
