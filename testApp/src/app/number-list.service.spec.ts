import { TestBed } from '@angular/core/testing';

import { NumberListService } from './number-list.service';

describe('NumberListService', () => {
  let service: NumberListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
