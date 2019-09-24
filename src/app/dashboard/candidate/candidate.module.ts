import { CandidateRoutingModule } from './candidate-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CandidateListComponent } from './candidate-list/candidate-list.component';

@NgModule({
  declarations: [CandidateListComponent],
  imports: [CandidateRoutingModule, SharedModule]
})
export class CandidateModule {}
