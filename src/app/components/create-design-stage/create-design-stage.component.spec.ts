import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDesignStageComponent } from './create-design-stage.component';

describe('CreateDesignStageComponent', () => {
  let component: CreateDesignStageComponent;
  let fixture: ComponentFixture<CreateDesignStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDesignStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDesignStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
