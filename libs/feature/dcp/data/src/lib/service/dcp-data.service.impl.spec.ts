import { TestBed } from '@angular/core/testing';

import { DcpDataServiceImpl } from './dcp-data.service.impl';

describe('DcpDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DcpDataServiceImpl = TestBed.get(DcpDataServiceImpl);
    expect(service).toBeTruthy();
  });
});
