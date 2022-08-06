// export class User {
//   constructor(
//     public username: string,
//     public password: string,
//     public id?: number,
//     public role?: string
//   ) {}
// }

export interface User {
  username: string;
  password: string;
  id?: number;
  role?: string;
}
