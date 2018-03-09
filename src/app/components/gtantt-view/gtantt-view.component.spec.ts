import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtanttViewComponent } from './gtantt-view.component';

describe('GtanttViewComponent', () => {
  let component: GtanttViewComponent;
  let fixture: ComponentFixture<GtanttViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtanttViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtanttViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
