

export type Roles = 'EDITOR' | 'ADMIN';

export interface User {
  uid?: string;
  email: string;
  displayName?: string;
  password?: string;
  photoURL?: string;
  role?: Roles;
}