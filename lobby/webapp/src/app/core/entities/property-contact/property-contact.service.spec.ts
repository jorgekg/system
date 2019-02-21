import { TestBed } from '@angular/core/testing';

import { PropertyContactService } from './property-contact.service';

describe('PropertyContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyContactService = TestBed.get(PropertyContactService);
    expect(service).toBeTruthy();
  });
});
