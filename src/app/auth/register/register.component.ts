import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../shared/notification/notification.service';

import { NotificationType } from '../../shared/notification/enums/notification-type.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  isLoading: boolean;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // TODO: proper error handling
    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.notificationService.showNotification('Account created successfully!', NotificationType.SUCCESS);
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.error = error;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  private initRegisterForm(): void {
    this.isLoading = false;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
