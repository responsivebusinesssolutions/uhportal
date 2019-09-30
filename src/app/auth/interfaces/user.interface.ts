import { Role } from 'src/app/shared/directives/role/enums/role.enum';

export interface User {
  firstName: string;
  id: number;
  lastName: string;
  roles: Array<Role>;
  token: string;
  username: string;
}
