import { TestBed, inject } from '@angular/core/testing';

import { FuncionesgeneralesService } from './funcionesgenerales.service';

describe('FuncionesgeneralesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionesgeneralesService]
    });
  });

  it('should be created', inject([FuncionesgeneralesService], (service: FuncionesgeneralesService) => {
    expect(service).toBeTruthy();
  }));
});
