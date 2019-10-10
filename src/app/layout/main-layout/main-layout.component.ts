import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { I18nService } from '../../i18n/i18n.service';
import { LoadingService } from 'app/shared/components/loading/loading.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewChecked, OnInit {
  isLoading: boolean | HttpErrorResponse;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private i18nService: I18nService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoadingStatus();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  private getLoadingStatus(): void {
    this.loadingService.getLoadingSubject().subscribe((res: boolean | HttpErrorResponse) => {
      if (res instanceof HttpErrorResponse) {
        this.isLoading = false;
        this.router.navigate(['/error']);
      } else {
        this.isLoading = res;
      }
    });
  }
}
