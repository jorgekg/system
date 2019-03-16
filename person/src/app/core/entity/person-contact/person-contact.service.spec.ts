import { TestBed } from '@angular/core/testing';

import { PersonContactService } from './person-contact.service';

describe('PersonContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonContactService = TestBed.get(PersonContactService);
    expect(service).toBeTruthy();
  });
});
