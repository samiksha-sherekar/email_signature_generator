import { TestBed } from '@angular/core/testing';

import { CopySignatureService } from './copy-signature.service';

describe('CopySignatureService', () => {
  let service: CopySignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopySignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
