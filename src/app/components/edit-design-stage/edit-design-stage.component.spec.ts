import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDesignStageComponent } from './edit-design-stage.component';

describe('EditDesignStageComponent', () => {
  let component: EditDesignStageComponent;
  let fixture: ComponentFixture<EditDesignStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDesignStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDesignStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
