import { ErrorRoutingModule } from './error-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [ErrorRoutingModule, SharedModule],
  exports: [ErrorComponent]
})
export class ErrorModule {}
