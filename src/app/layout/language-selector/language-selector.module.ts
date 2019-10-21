import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageSelectorDialogComponent } from './language-selector-dialog/language-selector-dialog.component';

@NgModule({
  declarations: [LanguageSelectorComponent, LanguageSelectorDialogComponent],
  imports: [SharedModule],
  exports: [LanguageSelectorComponent, LanguageSelectorDialogComponent]
})
export class LanguageSelectorModule {}
