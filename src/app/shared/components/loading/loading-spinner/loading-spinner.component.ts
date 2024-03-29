import { Component, Input } from '@angular/core';

import { LoadingSpinnerSize } from '../interfaces/loading-spinner-size.enum';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() size: LoadingSpinnerSize = LoadingSpinnerSize.L;
}
