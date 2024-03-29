import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from 'app/auth/auth.service';

import { Role } from './enums/role.enum';
import { Utils } from 'app/shared/utils/utils';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  @Input() appRole: Array<Role>;

  isVisible: boolean;
  userRoles: Array<Role>;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();

    if (!this.userRoles) {
      this.viewContainerRef.clear();
      this.isVisible = false;
    } else {
      // Check if user has the right role
      if (Utils.arraysIntersect(this.userRoles, this.appRole).length > 0) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    }
  }
}
