import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authentication.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;
  successMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  onSubmit() {
    // Reset alerts on submit
    this.error = null;
    this.successMessage = null;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authenticationService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
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

    // Show success message on registration
    if (this.route.snapshot.queryParams.registered) {
      this.successMessage = 'Registration successful';
    }
  }
}
