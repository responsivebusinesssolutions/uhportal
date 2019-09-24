import { AuthService } from '../auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './../../shared/material/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

class AuthServiceStub {
  currentUserValue = jasmine.createSpy('currentUserValue');
  login = jasmine.createSpy('login');
  register = jasmine.createSpy('register');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

fdescribe('RegisterComponent', () => {
  let activatedRoute: ActivatedRoute;
  let authService: AuthServiceStub;
  let component: RegisterComponent;
  let el: HTMLElement;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
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
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when currentUser is defined', () => {
    authService.currentUserValue.and.returnValue({});

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

      authService.register.and.returnValue(of({}));

      component.onSubmit();

      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toHaveBeenCalledWith(testUser);
    });

    it('should call router navigate when userService responds without error', () => {
      authService.register.and.returnValue(of({}));
      const expectedUrl = '/';

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([expectedUrl]);
    });

    it('should not call userService when form is invalid', () => {
      authService.register.and.returnValue(of({}));
      component.registerForm.patchValue({
        username: 'test'
      });

      component.onSubmit();

      expect(authService.register).not.toHaveBeenCalled();
    });
  });
});
