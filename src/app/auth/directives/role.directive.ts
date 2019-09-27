import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

import { AuthService } from '../auth.service';

import { Role } from '../enums/role.enum';

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
      if (this.userRoles.filter(x => this.appRole.includes(x)).length > 0) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    }
  }
}
