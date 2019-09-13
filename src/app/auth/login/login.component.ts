import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../../shared/notification/notification.service';

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
    private authenticationService: AuthenticationService,
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

    // TODO: proper error handling
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        () => {
          this.notificationService.showNotification('Logged in successfully!', NotificationType.SUCCESS);
          this.router.navigate(['/dashboard']);
        },
        () => {
          this.isLoading = false;
          this.notificationService.showNotification('Incorrect username / password!', NotificationType.ERROR);
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
