import { Base } from "../../../common";

export interface Lead extends Base {
    name: string;
    email: string;
    state: string;
    phone: string;
    type: string;
    gender: string;
    reporter: string;
    lead_status: string;
    property: string;
    city: string;
    country: string;
    source: string;
    userId: string;
    funnelId: string;
    contactId: string;
    account: string;
    contactName: string;
    person: string;
    personName: string;
    currency: string;
    value: number;
    potential: number;
    dueDate: string;
    stageId: string;
    position: number;
}