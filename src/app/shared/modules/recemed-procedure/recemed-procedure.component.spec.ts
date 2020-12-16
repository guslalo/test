import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecemedProcedureComponent } from './recemed-procedure.component';

describe('RecemedProcedureComponent', () => {
  let component: RecemedProcedureComponent;
  let fixture: ComponentFixture<RecemedProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecemedProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecemedProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
