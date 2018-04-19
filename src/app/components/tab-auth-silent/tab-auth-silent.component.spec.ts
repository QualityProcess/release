import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAuthSilentComponent } from './tab-auth-silent.component';

describe('TabAuthSilentComponent', () => {
  let component: TabAuthSilentComponent;
  let fixture: ComponentFixture<TabAuthSilentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAuthSilentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthSilentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
