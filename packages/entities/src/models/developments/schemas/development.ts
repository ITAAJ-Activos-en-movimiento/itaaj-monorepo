import { Base } from "../../../common";

export enum PropertyTypeDevelopment {
  HOUSE = "house",
  APARTAMENT = "apartament",
  CONDO = "condo",
  TOWNHOUSE = "townhouse",
  OTHER = "other",
}

export enum CategoryDevelopment {
  EXCLUSIVE = "exclusive",
  GENERAL = "general",
  INVESTMENT = "investment",
}

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
  neighborhood: string;
  street: string;
  external_number: string;
  internal_number: string;
  location: Location;
  price: number;
  area: AreaDevelopment;
  garage: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  image: string;
  owner: string;
  virtualTourUrl: string;
  video: string;
  antiquity: number;
  propertyStatus: string;
  type: PropertyTypeDevelopment;
  blockchainId: string;
  category: CategoryDevelopment;
  partner: string;
}
