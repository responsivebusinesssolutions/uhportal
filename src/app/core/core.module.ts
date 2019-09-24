import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AuthGuard } from './helpers';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { NotificationService } from '../shared/notification/notification.service';

import { fakeBackendProvider } from './helpers/fake-backend';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
  imports: [AuthModule, HttpClientModule, LayoutModule, SharedModule],
  providers: [
    AuthGuard,
    SharedModule,
    LoggedInGuard,
    NotificationService,
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
