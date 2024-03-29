import { AuthModule } from '../auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { I18nModule } from '../i18n/i18n.module';
import { LayoutModule } from '../layout/layout.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../auth/guards/auth.guard';
import { I18nPipe } from '../i18n/i18n.pipe';
import { LoggedInGuard } from '../auth/guards/logged-in.guard';
import { RoleGuard } from '../auth/guards/role.guard';

import { ErrorInterceptor } from '../shared/interceptors/error.interceptor';
import { RequestInterceptor } from '../shared/interceptors/request.interceptor';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';

import { fakeBackendProvider } from '../shared/helpers/fake-backend';
import { throwIfAlreadyLoaded } from '../shared/utils/module-import-guard';

@NgModule({
  imports: [
    AuthModule.forRoot(),
    HttpClientModule,
    I18nModule.forRoot(),
    LayoutModule.forRoot(),
    SharedModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoggedInGuard,
    I18nPipe,
    RoleGuard,
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
