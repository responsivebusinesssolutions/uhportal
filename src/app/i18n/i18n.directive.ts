import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

import { I18nService } from './i18n.service';

import { I18nPipe } from './i18n.pipe';

@Directive({
  // tslint:disable-next-line
  selector: '[translation]'
})
export class I18nDirective implements AfterViewChecked {
  @Input() params: Array<string | number>;
  @Input() translation: string;

  constructor(private el: ElementRef, private i18nPipe: I18nPipe, private i18nService: I18nService) {}

  ngAfterViewChecked(): void {
    this.updateModel();
  }

  private updateModel(): void {
    if (!this.i18nPipe.transform(this.translation, this.params)) {
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
}
