import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecemedCertificateComponent } from './recemed-certificate.component';

describe('RecemedCertificateComponent', () => {
  let component: RecemedCertificateComponent;
  let fixture: ComponentFixture<RecemedCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecemedCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecemedCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
