import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewChecked, OnInit {
  isLoading: boolean | HttpErrorResponse;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
    this.loadingService.loadingSubject.subscribe((res: boolean | HttpErrorResponse) => {
      if (res instanceof HttpErrorResponse) {
        this.isLoading = false;
        this.router.navigate(['/error']);
      } else {
        this.isLoading = res;
      }
    });
  }
}
