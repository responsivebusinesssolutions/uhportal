import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule],
  exports: [HeaderComponent]
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule
    };
  }
}
