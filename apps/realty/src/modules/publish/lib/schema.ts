export type ListingType =
  | 'vivienda'
  | 'parking'
  | 'local'
  | 'oficina'
  | 'trastero'
  | 'terreno';

export type PropertySubtype =
  | 'piso'
  | 'casa'
  | 'atico'
  | 'chalet'
  | 'duplex'
  | 'estudio'
  | 'otro';

export type TransactionType = 'sell' | 'rent' | 'share';

export interface ListingFormData {
  listingType: ListingType | null;

  propertySubtype: PropertySubtype | null;
  transactionType: TransactionType | null;
  salePrice?: number;
  rentPrice?: number;
  communityIncluded?: boolean;
  lessThanTwoDeposits?: boolean;
  builtArea?: number;
  bedrooms: number;
  bathrooms: number;
  age?: string;
  condition?: string;
  energyCertificate?: string | null;

  city: string;
  street: string;
  streetNumber: string;
  lat?: number;
  lng?: number;
  hideExactAddress?: boolean;
  orientation?: string;

  photos: File[];
  photoUrls: string[]; 

  description: string;
  interiorExtras: string[];
  exteriorExtras: string[];
  otherExtras: string[];

  contactEmail: string;
  contactName?: string;
  contactPhone?: string;
}

export const defaultListingFormData: ListingFormData = {
  listingType: null,
  propertySubtype: null,
  transactionType: 'sell',
  salePrice: undefined,
  rentPrice: undefined,
  communityIncluded: false,
  lessThanTwoDeposits: false,
  builtArea: undefined,
  bedrooms: 0,
  bathrooms: 0,
  age: '',
  condition: '',
  energyCertificate: null,
  city: '',
  street: '',
  streetNumber: '',
  lat: undefined,
  lng: undefined,
  hideExactAddress: false,
  orientation: '',
  photos: [],
  photoUrls: [],
  description: '',
  interiorExtras: [],
  exteriorExtras: [],
  otherExtras: [],
  contactEmail: '',
  contactName: '',
  contactPhone: '',
};
