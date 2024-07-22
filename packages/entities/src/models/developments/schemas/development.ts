import { Base } from "../../../common";
import { Property } from "../../properties";

export interface LocationDevelopment {
  latitude: number;
  longitude: number;
}

export interface AreaDevelopment {
  land_area: number;
  building_area: number;
  total_area: number;
}

export interface Development extends Base {
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
  location: LocationDevelopment;
  price: number;
  area: any;
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
  properties: Property[];
}
