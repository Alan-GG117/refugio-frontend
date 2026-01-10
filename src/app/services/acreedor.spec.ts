import { TestBed } from '@angular/core/testing';

import { Acreedor } from './acreedor';

describe('Acreedor', () => {
  let service: Acreedor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Acreedor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
