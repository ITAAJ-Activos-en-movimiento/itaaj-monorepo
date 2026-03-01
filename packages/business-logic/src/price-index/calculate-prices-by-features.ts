import { calculateAveragePrice } from "./average-price";

interface Property {
    priceM2: number;
    totalPrice: number;
    bedrooms: number;
    features: string[]
}

export const calculatePricesByFeatures = (properties: Property[]) => {
    const withTerrace = properties.filter(p => p.features.includes('terrace'));
    const withElevator = properties.filter(p => p.features.includes('elevator'));
    const furnished = properties.filter(p => p.features.includes('furnished'));
    const withParking = properties.filter(p => p.features.includes('parking'));
  
    return {
      withTerrace: calculateAveragePrice(withTerrace).averagePricePerSqM,
      withElevator: calculateAveragePrice(withElevator).averagePricePerSqM,
      furnished: calculateAveragePrice(furnished).averagePricePerSqM,
      withParking: calculateAveragePrice(withParking).averagePricePerSqM
    };
  }