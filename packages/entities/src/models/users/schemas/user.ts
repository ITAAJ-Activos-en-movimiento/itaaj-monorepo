import { Base } from "../../../common";

export interface User extends Base {
  roleId: number;
  residence: string;
  identification: string;
  method: string;
  email: string;
  isAdmin: boolean;
  name: string;
  lastname: string;
  password: string;
  phone: number;
  birthdate: Date;
  state: string;
  city: string;
  country: string;
  gender: string;
}
