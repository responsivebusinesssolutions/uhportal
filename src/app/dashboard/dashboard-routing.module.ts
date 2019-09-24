import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'candidate', pathMatch: 'full' },
  { path: 'candidate', loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
