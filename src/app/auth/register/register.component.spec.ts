import { AuthService } from './../auth.service';
import { MaterialModule } from './../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class AuthenticationServiceStub {
  register = jasmine.createSpy('register');
  currentUserValue = jasmine.createSpy('currentUserValue');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationServiceStub;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { returnUrl: 'home' } } }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
        authService = TestBed.get(AuthService);
        router = TestBed.inject(Router);
      });
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should call authenticationService with form values', () => {
    const firstName = 'test';
    const lastName = 'test';
    const username = 'username';
    const password = 'password';

    component.registerForm.patchValue({
      firstName,
      lastName,
      username,
      password
    });

    authService.register.and.returnValue(of({}));

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(authService.register).toHaveBeenCalledWith(
      Object({ firstName: 'test', lastName: 'test', username: 'username', password: 'password' })
    );
  });

  it('should not call authenticationService when form is invalid', () => {
    authService.register.and.returnValue(of({}));
    component.registerForm.patchValue({
      username: 'test'
    });

    component.onSubmit();

    expect(authService.register).not.toHaveBeenCalled();
  });
});
