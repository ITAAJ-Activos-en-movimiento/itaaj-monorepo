import { Base } from "../../../common";

export enum PropertyType {
 HOUSE= 'house',
 APARTAMENT= 'apartament',
 CONDO= 'condo',
 TOWNHOUSE= 'townhouse',
 OTHER = 'other'
}

export enum Category {
 EXCLUSIVE= 'exclusive',
 GENERAL= 'general',
 INVESTMENT= 'investment',
}

export interface Location {
 latitude: number;
 longitude: number;
}

export interface Area{
 land_area: number;
 building_area: number;
 total_area: number;
}

export interface Property extends Base{
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
 area: Area;
 garage: number;
 images: string[];
 amenities: string[]
 bedrooms: number;
 bathrooms: number;
 image: string;
 owner: string;
 virtualTourUrl: string;
 video: string;
 antiquity: number;
 propertyStatus: string;
 type: PropertyType;
 blockchainId: string;
 category: Category;
 partner: string;
}