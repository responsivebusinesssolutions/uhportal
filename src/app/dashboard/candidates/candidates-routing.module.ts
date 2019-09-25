import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes: Routes = [{ path: '', component: CandidateListComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {}
