import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiSaludComponent } from './mi-salud.component';

describe('MiSaludComponent', () => {
  let component: MiSaludComponent;
  let fixture: ComponentFixture<MiSaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiSaludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
