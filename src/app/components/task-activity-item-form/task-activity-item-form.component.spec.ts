import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskActivityItemComponent } from './form-task-activity-item.component';

describe('FormTaskActivityItemComponent', () => {
  let component: FormTaskActivityItemComponent;
  let fixture: ComponentFixture<FormTaskActivityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTaskActivityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTaskActivityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
