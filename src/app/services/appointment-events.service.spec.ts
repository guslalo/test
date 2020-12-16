import { TestBed } from '@angular/core/testing';

import { AppointmentEventsService } from './appointment-events.service';

describe('AppointmentEventsService', () => {
  let service: AppointmentEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
