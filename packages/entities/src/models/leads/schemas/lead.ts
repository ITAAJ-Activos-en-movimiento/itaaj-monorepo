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
  contactName: string;
  person: string;
  personName: string;
  currency: string;
  value: number;
  potential: number;
  stageId: string;
  position: number;
  dueDate: string;
}
