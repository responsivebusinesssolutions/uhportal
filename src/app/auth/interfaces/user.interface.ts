import { Role } from '../enums/role.enum';

export interface User {
  firstName: string;
  id: number;
  lastName: string;
  roles: Array<Role>;
  token: string;
  username: string;
}
