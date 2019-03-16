import { TestBed } from '@angular/core/testing';

import { PersonDocumentService } from './person-document.service';

describe('PersonDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonDocumentService = TestBed.get(PersonDocumentService);
    expect(service).toBeTruthy();
  });
});
