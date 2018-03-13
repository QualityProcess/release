import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStageComponent } from './design-stage.component';

describe('DesignStageComponent', () => {
  let component: DesignStageComponent;
  let fixture: ComponentFixture<DesignStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
