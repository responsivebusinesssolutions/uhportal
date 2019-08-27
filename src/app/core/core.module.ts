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
import { DataTableContainerComponent } from './containers/data-table-container/data-table-container.component';


@NgModule({
  declarations: [
    DataTableComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DataTableContainerComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CoreModule { }