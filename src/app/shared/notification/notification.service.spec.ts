import { TestBed, async } from '@angular/core/testing';

import { NotificationService } from './notification.service';

class NotificationServiceStub {}

describe('NotificationService', () => {
  let notificationService: NotificationServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NotificationService, useClass: NotificationServiceStub }]
    }).compileComponents();

    notificationService = TestBed.inject(NotificationService);
  }));

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });
});
