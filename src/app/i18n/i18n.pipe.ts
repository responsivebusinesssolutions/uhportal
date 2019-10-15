import { Pipe, PipeTransform } from '@angular/core';

import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(value: string, ...args: any[]): any {
    if (!value || value.length === 0) {
      return;
    }

    return this.i18nService.translate(value);
  }
}
