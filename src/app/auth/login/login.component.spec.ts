import { AuthService } from '../auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';

class AuthServiceStub {
  login = jasmine.createSpy('login');
  currentUserValue = jasmine.createSpy('currentUserValue');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let authenticationService: AuthServiceStub;
  let router: Router;
  let activatedRoute: ActivatedRoute;

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

    authenticationService = TestBed.get(AuthService);
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
    it('should create loginForm', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.value).toEqual({
        username: '',
        password: ''
      });
    });

    it('should set returnUrl according to queryparam', () => {
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

    it('should call authenticationService with form values', () => {
      const username = 'user';
      const password = 'password';

      component.loginForm.patchValue({
        username,
        password
      });
      authenticationService.login.and.returnValue(of({}));

      component.onSubmit();

      expect(authenticationService.login).toHaveBeenCalledTimes(1);
      expect(authenticationService.login).toHaveBeenCalledWith(username, password);
    });

    it('should call router navigate when authenticationService responds without error', () => {
      authenticationService.login.and.returnValue(of({}));
      const expectedUrl = '/';

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([expectedUrl]);
    });

    it('should not call authenticationService when form is invalid', () => {
      authenticationService.login.and.returnValue(of({}));
      component.loginForm.patchValue({
        username: 'test'
      });

      component.onSubmit();

      expect(authenticationService.login).not.toHaveBeenCalled();
    });

    it('should set success to null', () => {
      component.onSubmit();

      expect(component.successMessage).toBeNull();
    });
  });
});
