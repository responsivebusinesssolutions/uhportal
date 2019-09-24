import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CandidatesListComponent } from './candidates-list/candidates-list.component';

@NgModule({
  declarations: [CandidatesListComponent],
  imports: [DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
