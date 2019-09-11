import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
