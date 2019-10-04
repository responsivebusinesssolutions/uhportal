import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { NotificationService } from '../shared/notification/notification.service';

import { LoginInput } from './models/login-input.model';
import { NotificationType } from '../shared/notification/enums/notification-type.enum';
import { RegisterInput } from './models/register-input.model';
import { Role } from '../shared/directives/role/enums/role.enum';
import { User } from './interfaces/user.interface';
import { environment } from '../../environments/environment';

// TODO: HttpResponse might change in the future
@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser$: BehaviorSubject<User>;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    this.currentUser$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): User {
    return this.currentUser$.value;
  }

  getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${environment.apiUrl}/api/users`);
  }

  getUserRoles(): Array<Role> {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

    return (currentUser && currentUser.roles) || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(loginInput: LoginInput): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/auth/login`, loginInput).pipe(
      map(user => {
        // Login successful if there's a JWT token in the response
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUser$.next(user);
        }

        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');

    this.notificationService.showNotification('Logged out successfully!', NotificationType.SUCCESS);
    this.currentUser$.next(null);
  }

  register(registerInput: RegisterInput): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${environment.apiUrl}/api/auth/register`, registerInput);
  }
}
