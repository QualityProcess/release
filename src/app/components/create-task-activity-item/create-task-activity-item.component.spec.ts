import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskActivityItemComponent } from './create-task-activity-item.component';

describe('CreateTaskActivityItemComponent', () => {
  let component: CreateTaskActivityItemComponent;
  let fixture: ComponentFixture<CreateTaskActivityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskActivityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskActivityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
