import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
