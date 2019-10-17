import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { LanguageCode } from '../../../i18n/enums/language-code.enum';

@Component({
  selector: 'app-language-selector-dialog',
  templateUrl: './language-selector-dialog.component.html',
  styleUrls: ['./language-selector-dialog.component.scss']
})
export class LanguageSelectorDialogComponent implements OnInit {
  availableLanguages: Array<string>;
  tmpSelectedLanguage: LanguageCode;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedLanguage: LanguageCode,
    private matDialogRef: MatDialogRef<LanguageSelectorDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initAvailableLanguages();
    this.initTmpSelectedLanguage();
  }

  onClickCancel(): void {
    this.matDialogRef.close();
  }

  onSetTemporaryLanguage(languageCode: LanguageCode): void {
    this.tmpSelectedLanguage = languageCode;
  }

  private initAvailableLanguages(): void {
    const languages: Array<string> = new Array<string>();

    for (const code of Object.keys(LanguageCode)) {
      languages.push(LanguageCode[code]);
    }

    this.availableLanguages = languages;
  }

  private initTmpSelectedLanguage(): void {
    this.tmpSelectedLanguage = this.selectedLanguage;
  }
}
