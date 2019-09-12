import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AuthGuard } from './helpers';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';

import { fakeBackendProvider } from './helpers/fake-backend';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
  providers: [
    AuthGuard,
    LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
