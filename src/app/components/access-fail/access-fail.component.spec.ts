import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessFailComponent } from './access-fail.component';

describe('AccessFailComponent', () => {
  let component: AccessFailComponent;
  let fixture: ComponentFixture<AccessFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
