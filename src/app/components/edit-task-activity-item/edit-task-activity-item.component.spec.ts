import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskActivityItemComponent } from './edit-task-activity-item.component';

describe('EditTaskActivityItemComponent', () => {
  let component: EditTaskActivityItemComponent;
  let fixture: ComponentFixture<EditTaskActivityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskActivityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskActivityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
