import { MaterialModule } from './../../shared/material/material.module';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../../core/helpers/user.service';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

class AuthenticationServiceStub {
  login = jasmine.createSpy('login');
  currentUserValue = jasmine.createSpy('currentUserValue');
}

class UserServiceStub {
  register = jasmine.createSpy('register');
  currentUserValue = jasmine.createSpy('currentUserValue');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;
  let authenticationService: AuthenticationServiceStub;
  let userService: UserServiceStub;

  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { returnUrl: 'home' } } }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authenticationService = TestBed.get(AuthenticationService);
    userService = TestBed.get(UserService);

    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when currentUser is defined', () => {
    authenticationService.currentUserValue.and.returnValue({});

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  describe('onInit', () => {
    it('should create registerForm', () => {
      expect(component.registerForm).toBeDefined();
      expect(component.registerForm.value).toEqual({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      });
    });
  });

  describe('onSubmit', () => {
    it('should be called when form is submitted', () => {
      fixture.detectChanges();
      spyOn(component, 'onSubmit');
      el = fixture.debugElement.query(By.css('.register')).nativeElement;

      el.click();

      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call userService with form values', () => {
      const testUser = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        password: 'password'
      };

      component.registerForm.patchValue(testUser);

      userService.register.and.returnValue(of({}));

      component.onSubmit();

      expect(userService.register).toHaveBeenCalledTimes(1);
      expect(userService.register).toHaveBeenCalledWith(testUser);
    });

    it('should call router navigate when userService responds without error', () => {
      userService.register.and.returnValue(of({}));
      const expectedUrl = '/';

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([expectedUrl]);
    });

    it('should not call userService when form is invalid', () => {
      userService.register.and.returnValue(of({}));
      component.registerForm.patchValue({
        username: 'test'
      });

      component.onSubmit();

      expect(userService.register).not.toHaveBeenCalled();
    });
  });
});
