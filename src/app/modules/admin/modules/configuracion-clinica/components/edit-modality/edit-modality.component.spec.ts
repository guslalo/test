import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalityComponent } from './edit-modality.component';

describe('EditModalityComponent', () => {
  let component: EditModalityComponent;
  let fixture: ComponentFixture<EditModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
