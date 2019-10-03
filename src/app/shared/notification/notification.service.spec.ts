import { MatSnackBarModule } from '@angular/material';
import { TestBed, async } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [NotificationService]
    }).compileComponents();

    notificationService = TestBed.inject(NotificationService);
  }));

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });
});
