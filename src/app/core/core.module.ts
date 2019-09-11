import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AppMaterialModule } from './../app-material/app-material.module';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataTableComponent } from './components/data-table/data-table.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    DataTableComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    AppMaterialModule
  ]
})
export class CoreModule { }
