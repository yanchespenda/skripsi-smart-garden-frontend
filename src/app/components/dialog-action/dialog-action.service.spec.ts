import { TestBed } from '@angular/core/testing';

import { DialogActionService } from './dialog-action.service';

describe('DialogActionService', () => {
  let service: DialogActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
