import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../auth/guards/auth.guard';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';

import { ErrorInterceptor } from '../shared/interceptors/error.interceptor';
import { RequestInterceptor } from '../shared/interceptors/request.interceptor';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';

import { fakeBackendProvider } from '../shared/helpers/fake-backend';
import { throwIfAlreadyLoaded } from '../shared/utils/module-import-guard';

@NgModule({
  imports: [AuthModule, HttpClientModule, LayoutModule, SharedModule],
  providers: [
    AuthGuard,
    SharedModule,
    LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    fakeBackendProvider
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
