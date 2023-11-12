import { Base } from "../../../common";

export interface Proposal extends Base {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  households: string;
  neighborhood: string;
  street: string;
  external_number: string;
  internal_number: string;
  price: number;
  area: string;
  garage: number;
  images: string[];
  amenities: string[];
  bedrooms: string;
  bathrooms: string;
  image: string;
  owner: string;
  virtualTourUrl: string;
  video: string;
  antiquity: number;
  propertyStatus: string;
  type: string;
  blockchainId: string;
  partner: string;
}
