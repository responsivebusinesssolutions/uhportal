import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';
import { MaterialModule } from './material/material.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';
import { RoleComponent } from './directives/role/role.component';
import { RoleDirective } from './directives/role/role.directive';

@NgModule({
  declarations: [BreadcrumbComponent, LoadingSpinnerComponent, RoleComponent, RoleDirective],
  imports: [CommonModule, FormsModule, I18nModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    I18nModule,
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
