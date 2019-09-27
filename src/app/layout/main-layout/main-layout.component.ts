import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewChecked, OnInit {
  isLoading$: Observable<boolean>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.getLoadingStatus();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  private getLoadingStatus(): void {
    this.isLoading$ = this.loadingService.loadingSubject;
  }
}
