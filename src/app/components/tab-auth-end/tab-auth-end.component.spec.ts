import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAuthEndComponent } from './tab-auth-end.component';

describe('TabAuthEndComponent', () => {
  let component: TabAuthEndComponent;
  let fixture: ComponentFixture<TabAuthEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAuthEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
