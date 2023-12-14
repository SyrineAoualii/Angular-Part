import {Role} from "./role.enum";

export class User {
  id: string|undefined;

  username: string = "";
  email: string = "";
  password: string = "";

  phone: string = "";
  adresse: string = "";
  token: string = "";
  role: Role = Role.USER;
  
  image?: string | null;
}
