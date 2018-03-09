import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalHistogramComponent } from './horizontal-histogram.component';

describe('HorizontalHistogramComponent', () => {
  let component: HorizontalHistogramComponent;
  let fixture: ComponentFixture<HorizontalHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
