import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAgendaComponent } from './index-agenda.component';

describe('IndexAgendaComponent', () => {
  let component: IndexAgendaComponent;
  let fixture: ComponentFixture<IndexAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
