import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Subscription } from 'rxjs';

import { I18nService } from '../../i18n/i18n.service';

import { LanguageSelectorDialogComponent } from './language-selector-dialog/language-selector-dialog.component';

import { LanguageCode } from '../../i18n/enums/language-code.enum';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnDestroy, OnInit {
  currentLanguage: LanguageCode;
  subscription: Subscription;

  constructor(
    private i18nService: I18nService,
    private iconRegistry: MatIconRegistry,
    private matDialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeFromLanguageChangeEvents();
  }

  ngOnInit(): void {
    this.subscribeToLanguageChangeEvents();
  }

  onOpenDialog(): void {
    const dialogRef: MatDialogRef<LanguageSelectorDialogComponent> = this.matDialog.open(
      LanguageSelectorDialogComponent,
      {
        width: '360px',
        data: this.i18nService.currentLanguageValue
      }
    );

    dialogRef.afterClosed().subscribe((selectedLanguage: LanguageCode) => {
      if (selectedLanguage && selectedLanguage !== this.i18nService.currentLanguageValue) {
        this.setLanguage(selectedLanguage);
      }
    });
  }

  private loadFlagIcon(): void {
    this.iconRegistry.addSvgIcon(
      'en-flag',
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/flags/en.svg`)
    );

    this.iconRegistry.addSvgIcon(
      'hu-flag',
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/flags/hu.svg`)
    );
  }

  private setLanguage(languageCode: LanguageCode): void {
    this.i18nService.setLanguage(languageCode);
  }

  private subscribeToLanguageChangeEvents(): void {
    this.subscription = this.i18nService.currentLang.subscribe((event: LanguageCode) => {
      this.currentLanguage = event;

      this.loadFlagIcon();
    });
  }

  private unsubscribeFromLanguageChangeEvents(): void {
    this.subscription.unsubscribe();
  }
}