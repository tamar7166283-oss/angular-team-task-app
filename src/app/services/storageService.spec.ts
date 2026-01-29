import { TestBed } from '@angular/core/testing';

import { StorageService } from './storageService';

describe('Storage', () => {
  let service: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
