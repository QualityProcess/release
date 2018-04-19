import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleNavBarComponent } from './middle-nav-bar.component';

describe('MiddleNavBarComponent', () => {
  let component: MiddleNavBarComponent;
  let fixture: ComponentFixture<MiddleNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
