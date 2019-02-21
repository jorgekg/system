import { TestBed } from '@angular/core/testing';

import { PropertyAddressService } from './property-address.service';

describe('PropertyAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyAddressService = TestBed.get(PropertyAddressService);
    expect(service).toBeTruthy();
  });
});
