import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaHistorialComponent } from './ficha-historial.component';

describe('FichaHistorialComponent', () => {
  let component: FichaHistorialComponent;
  let fixture: ComponentFixture<FichaHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
