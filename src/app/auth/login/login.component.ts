import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/notification/notification.service';

import { LoginInput } from '../models/login-input.model';
import { NotificationType } from '../../shared/notification/enums/notification-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    // TODO: proper error handling
    const loginInput: LoginInput = new LoginInput(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );

    this.authService.login(loginInput).subscribe(
      () => {
        this.notificationService.showNotification('You have successfully logged in!', NotificationType.SUCCESS);
        this.router.navigate(['/dashboard']);
      },
      (err: HttpErrorResponse) => {
        if (err.error.status === 401) {
          this.loginForm.get('username').setErrors({ invalidCredentials: true });
          this.loginForm.get('password').setErrors({ invalidCredentials: true });
        }

        this.isLoading = false;
      }
    );
  }

  private initLoginForm(): void {
    this.isLoading = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
