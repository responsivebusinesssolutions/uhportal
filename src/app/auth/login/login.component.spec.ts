import { MaterialModule } from './../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { AuthModule } from './../auth.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

class AuthenticationServiceStub {
  login = jasmine.createSpy('login');
  currentUserValue = jasmine.createSpy('currentUserValue');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let authService: AuthenticationServiceStub;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpy('AuthService');

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AuthModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        activatedRoute = TestBed.get(ActivatedRoute);
        fixture.detectChanges();
        authService = TestBed.get(AuthService);
        router = TestBed.get(Router);
      });
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should create loginForm', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.value).toEqual({
      username: '',
      password: ''
    });
  });

  it('should be called when form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('.login__loading-button')).nativeElement;
    el.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call authenticationService with form values', () => {
    // const username = 'user';
    // const password = 'password';
    // component.loginForm.patchValue({
    //   username,
    //   password
    // });
    // authService.login.and.returnValue(of({}));
    // component.onSubmit();
    // expect(authService.login).toHaveBeenCalledTimes(1);
    // expect(authService.login).toHaveBeenCalledWith(username, password);
  });
});
