import { Base } from "../../../common";

export interface Lead extends Base {
    name: string;
    email: string;
    state: string;
    phone: number;
    type: string;
    gender: string;
    reporter: string;
    lead_status: string;
    property: string;
    city: string;
    country: string;
}