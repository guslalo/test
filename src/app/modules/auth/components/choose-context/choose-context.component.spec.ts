import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseContextComponent } from './choose-context.component';

describe('ChooseContextComponent', () => {
  let component: ChooseContextComponent;
  let fixture: ComponentFixture<ChooseContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
