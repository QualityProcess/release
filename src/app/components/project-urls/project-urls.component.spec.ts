import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUrlsComponent } from './project-urls.component';

describe('ProjectUrlsComponent', () => {
  let component: ProjectUrlsComponent;
  let fixture: ComponentFixture<ProjectUrlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUrlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
