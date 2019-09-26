import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'candidates', pathMatch: 'full' },
  { path: 'candidates', loadChildren: () => import('./candidates/candidates.module').then(m => m.CandidatesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
