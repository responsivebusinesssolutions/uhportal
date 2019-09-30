import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { NotificationService } from '../shared/notification/notification.service';

import { LoginInput } from './models/login-input.model';
import { NotificationType } from '../shared/notification/enums/notification-type.enum';
import { Role } from './enums/role.enum';
import { User } from './interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${environment.apiUrl}/users`);
  }

  getUserRoles(): Array<Role> {
    return this.currentUserValue.roles;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(loginInput: LoginInput): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.apiUrl}/users/authenticate`, loginInput).pipe(
      map(user => {
        // Login successful if there's a JWT token in the response
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');

    this.notificationService.showNotification('Logged out successfully!', NotificationType.SUCCESS);
    this.currentUserSubject.next(null);
  }

  register(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${environment.apiUrl}/users/register`, user);
  }
}
