import { TestBed } from '@angular/core/testing';

import { AthletesService } from './athletes.service';

describe('AthletesService', () => {
  let service: AthletesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthletesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
