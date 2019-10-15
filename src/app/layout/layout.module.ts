import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [MainLayoutComponent, ToolbarComponent],
  imports: [LanguageSelectorModule, SharedModule],
  exports: [LanguageSelectorModule]
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule
    };
  }
}
