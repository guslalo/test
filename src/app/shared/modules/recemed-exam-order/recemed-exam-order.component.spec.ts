import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecemedExamOrderComponent } from './recemed-exam-order.component';

describe('RecemedExamOrderComponent', () => {
  let component: RecemedExamOrderComponent;
  let fixture: ComponentFixture<RecemedExamOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecemedExamOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecemedExamOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
