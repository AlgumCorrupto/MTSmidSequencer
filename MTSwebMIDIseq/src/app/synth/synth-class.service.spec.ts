import { TestBed } from '@angular/core/testing';

import { SynthClassService } from './synth-class.service';

describe('SynthClassService', () => {
  let service: SynthClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynthClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
