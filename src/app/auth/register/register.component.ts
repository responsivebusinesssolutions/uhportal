import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/helpers/user.service';

import { first } from 'rxjs/operators';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true }
          });
        },
        error => {
          this.error = error;
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
