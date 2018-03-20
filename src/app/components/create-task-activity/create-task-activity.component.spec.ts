import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskActivityComponent } from './create-task-activity.component';

describe('CreateTaskActivityComponent', () => {
  let component: CreateTaskActivityComponent;
  let fixture: ComponentFixture<CreateTaskActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
