import { SharedModule } from './../shared/shared.module';
import { DataTableComponent } from './data-table/data-table.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DataTableComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class DashboardModule { }
