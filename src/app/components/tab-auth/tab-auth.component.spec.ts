import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAuthComponent } from './tab-auth.component';

describe('TabAuthComponent', () => {
  let component: TabAuthComponent;
  let fixture: ComponentFixture<TabAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
