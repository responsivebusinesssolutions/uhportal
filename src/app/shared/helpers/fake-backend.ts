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

import { User } from 'src/app/auth/interfaces/user.interface';

// Array in local storage for registered users
const users: Array<User> = JSON.parse(localStorage.getItem('users')) || [];

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

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        default:
          // Pass through any requests not handled above
          return next.handle(request);
      }
    }

    // Route functions
    function authenticate() {
      const { username, password } = body;
      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        return error('Username or password is incorrect');
      }

      return ok({
        firstName: user.firstName,
        id: user.id,
        lastName: user.lastName,
        token: 'fake-jwt-token',
        username: user.username
      });
    }

    function register() {
      const user = body;

      if (users.find(u => u.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

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
