import { CandidateRoutingModule } from './candidates-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CandidateListComponent } from './candidate-list/candidate-list.component';

@NgModule({
  declarations: [CandidateListComponent],
  imports: [CandidateRoutingModule, SharedModule]
})
export class CandidatesModule {}
