import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { DataTableComponent } from './data-table/data-table.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardRoutingModule, DataTableComponent],
  imports: [SharedModule]
})
export class DashboardModule {}
