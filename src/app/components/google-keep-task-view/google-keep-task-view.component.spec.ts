import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleKeepTaskViewComponent } from './google-keep-task-view.component';

describe('GoogleKeepTaskViewComponent', () => {
  let component: GoogleKeepTaskViewComponent;
  let fixture: ComponentFixture<GoogleKeepTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleKeepTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleKeepTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
