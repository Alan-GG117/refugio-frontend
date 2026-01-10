import { TestBed } from '@angular/core/testing';

import { ListaNegra } from './lista-negra';

describe('ListaNegra', () => {
  let service: ListaNegra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaNegra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
