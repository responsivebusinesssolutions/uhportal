import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LanguageCode } from './enums/language-code.enum';
import { Utils } from '../shared/utils/utils';

// TODO: cache control
// TODO: ghost text
// TODO: parameter interpolation
// TODO: language setting event
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage: LanguageCode;
  private translations: { [key: string]: string };

  constructor(private httpClient: HttpClient) {
    this.initDefaultLanguage();
    this.initTranslations();
  }

  get currentLang(): LanguageCode {
    return this.currentLanguage;
  }

  setLanguage(selectedLanguage: LanguageCode): void {
    this.currentLanguage = selectedLanguage;
  }

  translate(key: string): string {
    return (this.translations && this.translations[key]) || key;
  }

  private initDefaultLanguage(): void {
    // Check if lang localStorage item is available
    // and if it is a valid language code
    if (localStorage.getItem('lang') && this.isValidLanguageCode(localStorage.getItem('lang'))) {
      this.currentLanguage = LanguageCode[localStorage.getItem('lang')];
    } else {
      // Otherwise set default language code to browser's language
      this.currentLanguage = LanguageCode[navigator.language];

      localStorage.setItem('lang', this.currentLanguage);
    }
  }

  private initTranslations(): void {
    this.httpClient.get<{ [key: string]: string }>(`assets/i18n/${this.currentLang}.json`).subscribe(
      (res: { [key: string]: string }) => {
        this.translations = Utils.flattenObject(res);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  private isValidLanguageCode(languageCode: string): boolean {
    return !!LanguageCode[languageCode];
  }
}
