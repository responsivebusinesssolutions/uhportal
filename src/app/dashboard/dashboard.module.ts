import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
