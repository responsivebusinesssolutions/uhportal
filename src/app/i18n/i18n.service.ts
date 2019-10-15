import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LanguageCode } from './enums/language-code.enum';
import { Utils } from '../shared/utils/utils';
import { BehaviorSubject } from 'rxjs';

// TODO: ghost text
// TODO: parameter interpolation
// TODO: language setting event
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLang$: BehaviorSubject<LanguageCode> = this.initDefaultLanguage();
  private translations: { [key: string]: string };

  constructor(private httpClient: HttpClient) {
    this.initDefaultLanguage();
    this.getTranslations();
  }

  get currentLang(): BehaviorSubject<LanguageCode> {
    return this.currentLang$;
  }

  get currentLanguageValue(): LanguageCode {
    return this.currentLang$.value;
  }

  setLanguage(selectedLanguage: LanguageCode): void {
    localStorage.setItem('lang', selectedLanguage);

    this.currentLang$.next(selectedLanguage);
    this.getTranslations();
  }

  translate(key: string): string {
    return (this.translations && this.translations[key]) || key;
  }

  private getTranslations(): void {
    if (this.isValidLanguageCode(this.currentLanguageValue)) {
      this.httpClient.get<{ [key: string]: string }>(`assets/i18n/${this.currentLanguageValue}.json`).subscribe(
        (res: { [key: string]: string }) => {
          this.translations = Utils.flattenObject(res);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      );
    }
  }

  private initDefaultLanguage(): BehaviorSubject<LanguageCode> {
    // Check if lang localStorage item is available
    // and if it is a valid language code
    if (localStorage.getItem('lang') && this.isValidLanguageCode(localStorage.getItem('lang'))) {
      return new BehaviorSubject<LanguageCode>(LanguageCode[localStorage.getItem('lang')]);
    } else {
      // Otherwise set default language code to browser's language
      localStorage.setItem('lang', LanguageCode[navigator.language]);

      return new BehaviorSubject<LanguageCode>(LanguageCode[navigator.language]);
    }
  }

  private isValidLanguageCode(languageCode: string): boolean {
    return !!LanguageCode[languageCode];
  }
}
