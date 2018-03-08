import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMatrixComponent } from './project-matrix.component';

describe('ProjectMatrixComponent', () => {
  let component: ProjectMatrixComponent;
  let fixture: ComponentFixture<ProjectMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
