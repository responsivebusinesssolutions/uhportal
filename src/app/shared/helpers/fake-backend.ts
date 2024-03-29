import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Candidate } from 'app/dashboard/candidates/models/candidate.model';
import { ErrorType } from 'app/error/enums/error-type.enum';
import { Role } from '../directives/role/enums/role.enum';

import candidatesMock from '@assets/mocks/candidates.json';

// Array in local storage for registered users
const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { body, method, url } = request;

    // Wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize())
        // Call materialize and dematerialize to ensure delay even if an error is thrown
        .pipe(delay(500))
        .pipe(dematerialize())
    );

    // TODO: /api for routes
    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/auth/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/auth/register') && method === 'POST':
          return register();
        case url.endsWith('/api/users') && method === 'GET':
          return users();
        case url.endsWith('/api/candidates') && method === 'GET':
          return candidates();
        default:
          // Pass through any requests not handled above
          return next.handle(request);
      }
    }

    // Route functions
    function authenticate() {
      const { username, password } = body;
      const user = registeredUsers.find(u => u.username === username && u.password === password);

      if (!user) {
        return error(ErrorType.INVALID_USERNAME_OR_PASSWORD);
      }

      return ok({
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
        roles: user.roles,
        token: 'fake-jwt-token',
        username: user.username
      });
    }

    function candidates() {
      const responseBody = Object.values(candidatesMock as Array<Candidate>);

      return of(new HttpResponse({ status: 200, body: responseBody }));
    }

    function users() {
      return ok(users);
    }

    function register() {
      const user = body;

      if (registeredUsers.find(u => u.username === user.username)) {
        return error(ErrorType.USERNAME_IS_ALREADY_TAKEN);
      }

      user.id = users.length ? Math.max(...registeredUsers.map(u => u.id)) + 1 : 1;
      user.roles = [Role.INTERNAL];

      registeredUsers.push(user);
      localStorage.setItem('users', JSON.stringify(registeredUsers));

      return ok();
    }

    // Helper functions
    function error(message) {
      return throwError({ error: { message } });
    }

    function ok(responseBody?: any) {
      return of(new HttpResponse({ status: 200, body: responseBody }));
    }
  }
}

export const fakeBackendProvider = {
  // Use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
