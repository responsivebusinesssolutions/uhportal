import { AuthRoutingModule } from './auth-routing.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { AuthContainerComponent } from './auth-container/auth-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthContainerComponent, LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    };
  }
}
