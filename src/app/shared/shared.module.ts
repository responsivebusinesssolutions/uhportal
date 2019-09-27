import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [BreadcrumbComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    MaterialModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
