import { TestBed } from '@angular/core/testing';

import { DialogNotificationsService } from './dialog-notifications.service';

describe('DialogNotificationsService', () => {
  let service: DialogNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
