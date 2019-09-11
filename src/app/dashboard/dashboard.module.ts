import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [SharedModule]
})
export class DashboardModule {}
