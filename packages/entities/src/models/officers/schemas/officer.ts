import { Base } from "../../../common";

export interface Officer extends Base{
 uuid: string;
 username: string;
 firstName: string;
 middleName: string;
 lastName: string; 
 email: string; 
 middleLastName: string;
 photo: string;
 role: string;
 lastLogin: string;
}