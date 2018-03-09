import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStagesComponent } from './design-stages.component';

describe('DesignStagesComponent', () => {
  let component: DesignStagesComponent;
  let fixture: ComponentFixture<DesignStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
