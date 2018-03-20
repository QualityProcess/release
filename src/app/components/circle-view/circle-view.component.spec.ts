import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleViewComponent } from './circle-view.component';

describe('CircleViewComponent', () => {
  let component: CircleViewComponent;
  let fixture: ComponentFixture<CircleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
