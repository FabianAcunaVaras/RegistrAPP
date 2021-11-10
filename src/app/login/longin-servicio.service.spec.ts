import { TestBed } from '@angular/core/testing';

import { LonginServicioService } from './longin-servicio.service';

describe('LonginServicioService', () => {
  let service: LonginServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LonginServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
