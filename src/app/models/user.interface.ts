
// export interface Roles {
//     editor?: boolean;
//     admin?: boolean;
// }


// export interface UserInterface {
//     id?: string;
//     name?: string;
//     email?: string;
//     pwd?: string;
//     photoUrl?: string;

//     roles: Roles;
// }

export type Roles = 'USER' | 'EDITOR' | 'ADMIN';

export interface User {
  uid?: string;
  email: string;
  displayName?: string;
  password?: string;
  photoURL?: string;
  role?: Roles;
}