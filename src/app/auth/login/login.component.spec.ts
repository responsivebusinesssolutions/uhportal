import { AuthService } from '../auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

class AuthServiceStub {
  currentUserValue = jasmine.createSpy('currentUserValue');
  login = jasmine.createSpy('login');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

fdescribe('LoginComponent', () => {
  let activatedRoute: ActivatedRoute;
  let authService: AuthServiceStub;
  let component: LoginComponent;
  let el: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { returnUrl: 'home' } } }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
    it('should create loginForm', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.value).toEqual({
        username: '',
        password: ''
      });
    });

    xit('should set returnUrl according to queryparam', () => {
      expect(component.returnUrl).toEqual('home');
    });
  });

  describe('onSubmit', () => {
    it('should be called when form is submitted', () => {
      fixture.detectChanges();
      spyOn(component, 'onSubmit');
      el = fixture.debugElement.query(By.css('.login')).nativeElement;

      el.click();

      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call authService with form values', () => {
      const username = 'user';
      const password = 'password';

      component.loginForm.patchValue({
        username,
        password
      });
      authService.login.and.returnValue(of({}));

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(username, password);
    });

    it('should call router navigate when authService responds without error', () => {
      authService.login.and.returnValue(of({}));
      const expectedUrl = '/';

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([expectedUrl]);
    });

    it('should not call authService when form is invalid', () => {
      authService.login.and.returnValue(of({}));
      component.loginForm.patchValue({
        username: 'test'
      });

      component.onSubmit();

      expect(authService.login).not.toHaveBeenCalled();
    });

    xit('should set success to null', () => {
      component.onSubmit();

      expect(component.successMessage).toBeNull();
    });
  });
});
