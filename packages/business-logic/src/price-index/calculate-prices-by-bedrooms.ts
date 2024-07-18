import { calculateAveragePrice } from "./average-price";

interface Property {
  priceM2?: number;
  bedrooms: number;
}

export const calculatePricesByBedrooms = (properties: Property[]) => {
    const studioOr1Bed = properties.filter(p => p.bedrooms <= 1);
    const twoBeds = properties.filter(p => p.bedrooms === 2);
    const threeBeds = properties.filter(p => p.bedrooms === 3);
    const moreThanThreeBeds = properties.filter(p => p.bedrooms > 3);
  
    return {
      studioOr1Bedroom: calculateAveragePrice(studioOr1Bed).averagePricePerSqM,
      twoBedrooms: calculateAveragePrice(twoBeds).averagePricePerSqM,
      threeBedrooms: calculateAveragePrice(threeBeds).averagePricePerSqM,
      moreThanThreeBedrooms: calculateAveragePrice(moreThanThreeBeds).averagePricePerSqM
    };
}
