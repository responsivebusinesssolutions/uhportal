import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';
import { RoleDirective } from '../auth/directives/role.directive';

@NgModule({
  declarations: [BreadcrumbComponent, LoadingSpinnerComponent, RoleDirective],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    MaterialModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    RoleDirective,
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
