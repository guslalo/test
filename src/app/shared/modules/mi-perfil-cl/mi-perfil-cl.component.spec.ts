import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCLComponent } from './mi-perfil-cl.component';

describe('PerfilComponent', () => {
  let component: PerfilCLComponent;
  let fixture: ComponentFixture<PerfilCLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilCLComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
