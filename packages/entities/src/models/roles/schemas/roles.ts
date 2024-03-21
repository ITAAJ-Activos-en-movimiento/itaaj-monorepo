import { Base } from "../../../common";

export enum RoleType {
 INVESTOR= 'investor',
 BROKER= 'broker',
}

export interface Role extends Base{
 role: string;
 description: string;
}