import { Component } from '@angular/core';

import { Role } from './enums/role.enum';

@Component({
  selector: 'app-role-component',
  template: '<div *appRole=[roles.INTERNAL]>Internal component</div>'
})
export class RoleComponent {
  roles = Role;
}
