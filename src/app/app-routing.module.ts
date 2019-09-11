import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTableComponent } from './core/components/data-table/data-table.component';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';
import { AuthGuard } from './core/helpers/auth.guard';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent},
      { path: 'data-table', component: DataTableComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

