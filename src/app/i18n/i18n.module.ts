import { ModuleWithProviders, NgModule } from '@angular/core';

import { I18nDirective } from './i18n.directive';
import { I18nPipe } from './i18n.pipe';

@NgModule({
  declarations: [I18nDirective, I18nPipe],
  exports: [I18nDirective, I18nPipe]
})
export class I18nModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nModule
    };
  }
}
