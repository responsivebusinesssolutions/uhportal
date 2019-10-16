import { BehaviorSubject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LanguageCode } from './enums/language-code.enum';
import { Utils } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  languageChanged: EventEmitter<void> = new EventEmitter<void>();

  private currentLang$: BehaviorSubject<LanguageCode> = this.initDefaultLanguage();
  private translations: { [key: string]: string };

  constructor(private httpClient: HttpClient) {}

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

  translate(key: string, args?: Array<string | number>): string {
    const translatedText: string = (this.translations && this.translations[key]) || null;

    return this.interpolateParams(translatedText, args);
  }

  private getTranslations(): void {
    const currentLanguage: string = localStorage.getItem('lang');

    if (this.isValidLanguageCode(currentLanguage)) {
      this.httpClient.get<{ [key: string]: string }>(`assets/i18n/${currentLanguage}.json`).subscribe(
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
      this.getTranslations();

      return new BehaviorSubject<LanguageCode>(LanguageCode[localStorage.getItem('lang')]);
    } else {
      // Otherwise set default language code to browser's language
      // We only need the major lang code for now
      const newDefaultLanguage: LanguageCode = LanguageCode[navigator.language.split('-')[0]];

      localStorage.setItem('lang', newDefaultLanguage);

      this.getTranslations();

      return new BehaviorSubject<LanguageCode>(newDefaultLanguage);
    }
  }

  private interpolateParams(translatedText: string, args?: Array<string | number>): string {
    let newText: string = translatedText ? translatedText.substr(0, translatedText.length) : null;

    if (args && args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        newText = newText.replace(`{${i}}`, args[i].toString());
      }
    }

    return newText;
  }

  private isValidLanguageCode(languageCode: string): boolean {
    return !!LanguageCode[languageCode];
  }
}
