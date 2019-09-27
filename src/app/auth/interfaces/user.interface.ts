import { Role } from '../enums/role.enum';

export interface User {
  firstName: string;
  id: number;
  lastName: string;
  role: Role;
  token: string;
  username: string;
}
