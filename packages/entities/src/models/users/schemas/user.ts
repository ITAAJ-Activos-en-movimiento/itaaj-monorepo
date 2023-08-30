import { Base } from "../../../common";

export interface User extends Base {
    method: string;
    email: string;
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