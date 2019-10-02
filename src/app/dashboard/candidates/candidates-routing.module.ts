import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { Role } from 'app/shared/directives/role/enums/role.enum';
import { RoleGuard } from 'app/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: CandidateListComponent,
    pathMatch: 'prefix',
    canActivate: [RoleGuard],
    data: { roles: [Role.HR_CONSULTANT, Role.INTERNAL], title: 'Candidate list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {}
