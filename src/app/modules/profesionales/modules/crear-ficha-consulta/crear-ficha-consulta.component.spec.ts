import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFichaConsultaComponent } from './crear-ficha-consulta.component';

describe('CrearFichaConsultaComponent', () => {
  let component: CrearFichaConsultaComponent;
  let fixture: ComponentFixture<CrearFichaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrearFichaConsultaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFichaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
