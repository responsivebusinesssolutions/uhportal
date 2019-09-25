import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'candidate-list', pathMatch: 'full' },
  { path: 'candidate-list', component: CandidateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {}
