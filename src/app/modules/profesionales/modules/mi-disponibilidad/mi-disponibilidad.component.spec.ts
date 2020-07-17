import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiDisponibilidadComponent } from './mi-disponibilidad.component';

describe('MiDisponibilidadComponent', () => {
  let component: MiDisponibilidadComponent;
  let fixture: ComponentFixture<MiDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
