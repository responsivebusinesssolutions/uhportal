import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationType } from './enums/notification-type.enum';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: NotificationType) {
    this.snackBar.open(message, 'Close', {
      panelClass:
        type === NotificationType.ERROR
          ? 'notification-error'
          : type === NotificationType.WARNING
          ? 'notification-warning'
          : 'notification-success',
      duration: 5000
    });
  }
}
