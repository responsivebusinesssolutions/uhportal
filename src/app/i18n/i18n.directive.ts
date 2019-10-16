import { AfterViewChecked, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { I18nService } from './i18n.service';

import { I18nPipe } from './i18n.pipe';

@Directive({
  // tslint:disable-next-line
  selector: '[translation]'
})
export class I18nDirective implements AfterViewChecked, OnDestroy, OnInit {
  @Input() params: Array<string | number>;
  @Input() translation: string;

  private languageChangedLoading: boolean;
  private languageChangedSubscriber: Subscription;

  constructor(private el: ElementRef, private i18nPipe: I18nPipe, private i18nService: I18nService) {}

  ngAfterViewChecked(): void {
    this.updateModel();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromLanguageChangedEvent();
  }

  ngOnInit(): void {
    this.subscribeToLanguageChangedEvent();
  }

  private updateModel(): void {
    if (!this.i18nPipe.transform(this.translation, this.params) || this.languageChangedLoading) {
      const placeholderWidth: number = this.translation.split('.')[this.translation.split('.').length - 1].length;
      (this.el.nativeElement as HTMLElement).classList.add('ghost-element');
      (this.el.nativeElement as HTMLElement).innerText = '------';
      (this.el.nativeElement as HTMLElement).style.width = `${placeholderWidth * 10}px`;
    } else {
      (this.el.nativeElement as HTMLElement).innerText = this.i18nPipe.transform(this.translation, this.params);
      (this.el.nativeElement as HTMLElement).classList.remove('ghost-element');
      (this.el.nativeElement as HTMLElement).style.width = 'auto';
    }
  }

  private subscribeToLanguageChangedEvent(): void {
    this.i18nService.languageChanged.subscribe(res => (this.languageChangedLoading = res));
  }

  private unsubscribeFromLanguageChangedEvent(): void {
    this.languageChangedSubscriber.unsubscribe();
  }
}
