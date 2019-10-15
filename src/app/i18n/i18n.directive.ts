import { AfterViewChecked, Directive, ElementRef, Input, OnInit } from '@angular/core';

import { I18nPipe } from './i18n.pipe';

@Directive({
  // tslint:disable-next-line
  selector: '[translation]'
})
export class I18nDirective implements AfterViewChecked {
  @Input() params: Array<string | number>;
  @Input() translation: string;

  constructor(private el: ElementRef, private i18nPipe: I18nPipe) {}

  ngAfterViewChecked(): void {
    this.updateModel();
  }

  private updateModel(): void {
    (this.el.nativeElement as HTMLElement).textContent = this.i18nPipe.transform(this.translation, this.params);
  }
}
