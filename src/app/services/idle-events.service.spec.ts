import { TestBed } from '@angular/core/testing';

import { IdleEventsService } from './idle-events.service';

describe('IdleEventsService', () => {
  let service: IdleEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
