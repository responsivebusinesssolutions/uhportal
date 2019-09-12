import { DataTableComponent } from './data-table/data-table.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/helpers';

const routes: Routes = [
  { path: '', redirectTo: 'data-table', pathMatch: 'full' },
  { path: 'data-table', component: DataTableComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
