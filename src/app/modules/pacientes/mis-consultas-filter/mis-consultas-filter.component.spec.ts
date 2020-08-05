import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisConsultasFilterComponent } from './mis-consultas-filter.component';

describe('MisConsultasFilterComponent', () => {
  let component: MisConsultasFilterComponent;
  let fixture: ComponentFixture<MisConsultasFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MisConsultasFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisConsultasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
