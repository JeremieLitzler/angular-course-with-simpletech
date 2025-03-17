import { TestBed } from '@angular/core/testing';

import { MonsterWithHttpResourceService } from './monster-with-http-resource.service';

describe('MonsterWithHttpResourceService', () => {
  let service: MonsterWithHttpResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterWithHttpResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
