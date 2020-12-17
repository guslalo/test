import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecemedPrescriptionComponent } from './recemed-prescription.component';

describe('RecemedPrescriptionComponent', () => {
  let component: RecemedPrescriptionComponent;
  let fixture: ComponentFixture<RecemedPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecemedPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecemedPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
