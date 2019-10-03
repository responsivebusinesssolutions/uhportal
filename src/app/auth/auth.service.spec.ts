import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { NEVER } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { environment } from '@env/environment';

import { AuthService } from './auth.service';
import { NotificationService } from 'app/shared/notification/notification.service';

import { LoginInput } from './models/login-input.model';
import { NotificationType } from 'app/shared/notification/enums/notification-type.enum';
import { RegisterInput } from './models/register-input.model';
import { Role } from 'app/shared/directives/role/enums/role.enum';
import { User } from './interfaces/user.interface';

import usersMock from '@assets/mocks/users.json';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let notificationService: any;
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showNotification']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [{ provide: NotificationService, useValue: notificationServiceSpy }]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(NotificationService);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return all users', () => {
    authService.getAllUsers().subscribe((users: Array<User>) => {
      expect(users.length).toBe(3);

      const user: User = users.find(c => c.id === 3);

      expect(user).toBeTruthy();
      expect(user.username).toBe('Username 3');
    });

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/users`);

    expect(req.request.method).toEqual('GET');

    req.flush(usersMock);
  });

  it('should give an error if getting all users fails', () => {
    authService.getAllUsers().subscribe(
      () => NEVER,
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/users`);

    expect(req.request.method).toEqual('GET');

    req.flush('Fetching users failed', { status: 500, statusText: 'Internal server error' });
  });

  it('should logout user', () => {
    const loggedInUser: User = {
      firstName: 'First name',
      id: 33,
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'jwt-token',
      username: 'Username 33'
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    expect(localStorage.getItem('currentUser')).toBeTruthy();

    authService.logout();

    expect(localStorage.getItem('currentUser')).toBeFalsy();
    expect(notificationService.showNotification).toHaveBeenCalledTimes(1);
    expect(notificationService.showNotification).toHaveBeenCalledWith(
      'Logged out successfully!',
      NotificationType.SUCCESS
    );

    // TODO: BehaviorSubject / Observable test
  });

  it('should return one role', () => {
    const loggedInUser: User = {
      firstName: 'First name',
      id: 33,
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'jwt-token',
      username: 'Username 33'
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    expect(localStorage.getItem('currentUser')).toBeTruthy();
    expect(authService.getUserRoles().length).toBe(1);

    localStorage.removeItem('currentUser');

    expect(authService.getUserRoles()).toBe(null);
  });

  it('should register user', () => {
    const registerInput: RegisterInput = new RegisterInput('First name', 'Last name', '123456', 'Username 1');
    const expectedResponse = new HttpResponse({ status: 200 });

    authService.register(registerInput).subscribe((res: HttpResponse<any>) => {
      expect(res.status).toBe(200);
    });

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/auth/register`);

    expect(req.request.method).toEqual('POST');
    expect((req.request.body as RegisterInput).username).toEqual(registerInput.username);

    req.flush(expectedResponse);
  });

  it('should give an error if registering user fails', () => {
    const registerInput: RegisterInput = new RegisterInput('First name', 'Last name', '123456', 'Username 1');

    authService.register(registerInput).subscribe(
      () => NEVER,
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/auth/register`);

    expect(req.request.method).toEqual('POST');

    req.flush('Registering user failed', { status: 500, statusText: 'Internal server error' });
  });

  // TODO: Observable / Subject test
  xit('should return true if user is logged in', () => {
    const loggedInUser: User = {
      firstName: 'First name',
      id: 33,
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'jwt-token',
      username: 'Username 33'
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    expect(authService.isLoggedIn()).toBeTruthy();
  });

  // TODO: Observable / Subject test
  xit('should return false if user is not logged in', () => {
    const loggedInUser: User = {
      firstName: 'First name',
      id: 33,
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'jwt-token',
      username: 'Username 33'
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

    authService.logout();

    expect(authService.isLoggedIn()).toBeFalsy();
  });

  it('should log user in', () => {
    const loginInput: LoginInput = new LoginInput('username', 'password');
    const expectedResponse: User = {
      username: 'username',
      firstName: 'First name',
      lastName: 'Last name',
      roles: [Role.INTERNAL],
      token: 'token',
      id: 3
    };

    authService.login(loginInput).subscribe((res: HttpResponse<User>) => {
      const loggedInUser: User = JSON.parse(localStorage.getItem('currentUser'));

      expect(loggedInUser).toBeTruthy();
      expect(loggedInUser.username).toBe(loginInput.username);

      // TODO: Observable / Subject test
      expect(localStorage.getItem('currentUser')).toBeTruthy();
    });

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/auth/login`);

    expect(req.request.method).toEqual('POST');
    expect((req.request.body as RegisterInput).username).toEqual(loginInput.username);

    req.flush(expectedResponse);
  });

  it('should give an error if login user fails', () => {
    const loginInput: LoginInput = new LoginInput('username', 'password');

    authService.login(loginInput).subscribe(
      () => NEVER,
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/auth/login`);

    expect(req.request.method).toEqual('POST');

    req.flush('User login failed', { status: 500, statusText: 'Internal server error' });
  });
});
