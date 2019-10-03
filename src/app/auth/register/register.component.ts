import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/notification/notification.service';

import { ErrorType } from 'app/error/enums/error-type.enum';
import { NotificationType } from '../../shared/notification/enums/notification-type.enum';
import { RegisterInput } from '../models/register-input.model';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorTypes = ErrorType;
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

    this.isLoading = true;

    const registerInput: RegisterInput = new RegisterInput(
      this.registerForm.get('firstName').value,
      this.registerForm.get('lastName').value,
      this.registerForm.get('username').value,
      this.registerForm.get('password').value
    );

    this.authService.register(registerInput).subscribe(
      () => {
        this.notificationService.showNotification('Account created successfully!', NotificationType.SUCCESS);
        this.router.navigate(['/auth/login']);
      },
      (err: ErrorType) => {
        this.handleFormErrors(err);

        this.isLoading = false;
      }
    );
  }

  private handleFormErrors(err: ErrorType): void {
    if (err === ErrorType.USERNAME_IS_ALREADY_TAKEN) {
      this.registerForm.get('username').setErrors({ usernameIsAlreadyTaken: true });
    }
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
