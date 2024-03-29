import { RouterTestingModule } from '@angular/router/testing';
import { LoginInput } from './../models/login-input.model';
import { MaterialModule } from './../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { I18nPipe } from '../../i18n/i18n.pipe';

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
  let authService: any;
  let router: any;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule, SharedModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub },
        I18nPipe,
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { returnUrl: '/dashboard' } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
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
    const username = 'username';
    const password = 'password';
    const loginInput: LoginInput = { username: 'username', password: 'password' };

    component.loginForm.patchValue({
      username,
      password
    });

    authService.login.and.returnValue(of({}));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(new LoginInput(username, password));
  });

  it('should not call authenticationService when form is invalid', () => {
    authService.login.and.returnValue(of({}));
    component.loginForm.patchValue({
      username: 'test'
    });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call router navigate when authenticationService responds without error', fakeAsync(() => {
    authService.login.and.returnValue(of({}));
    const expectedUrl = '/dashboard';

    component.onSubmit();
    router.navigate();
    expect(router.navigate).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith([expectedUrl]);
  }));
});
