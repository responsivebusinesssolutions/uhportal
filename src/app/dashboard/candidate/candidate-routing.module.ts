import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/auth/guards/auth.guard';

import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'candidate-list', pathMatch: 'full' },
  { path: 'candidate-list', component: CandidateListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {}
