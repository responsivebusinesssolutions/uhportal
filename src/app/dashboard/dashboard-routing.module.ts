import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';

import { CandidatesListComponent } from './candidates-list/candidates-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'candidates-list', pathMatch: 'full' },
  { path: 'candidates-list', component: CandidatesListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
