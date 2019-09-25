import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [HeaderComponent, MainLayoutComponent],
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
