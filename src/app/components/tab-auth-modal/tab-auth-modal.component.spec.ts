import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAuthModalComponent } from './tab-auth-modal.component';

describe('TabAuthModalComponent', () => {
  let component: TabAuthModalComponent;
  let fixture: ComponentFixture<TabAuthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAuthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
