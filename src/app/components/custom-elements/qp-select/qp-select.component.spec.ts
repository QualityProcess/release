import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpSelectComponent } from './qp-select.component';

describe('QpSelectComponent', () => {
  let component: QpSelectComponent;
  let fixture: ComponentFixture<QpSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
