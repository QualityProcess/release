import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStageFormComponent } from './design-stage-form.component';

describe('DesignStageFormComponent', () => {
  let component: DesignStageFormComponent;
  let fixture: ComponentFixture<DesignStageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignStageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
