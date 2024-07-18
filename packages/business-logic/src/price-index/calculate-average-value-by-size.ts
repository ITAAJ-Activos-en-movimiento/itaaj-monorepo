import { calculateAveragePrice } from "./average-price";

interface Property {
    priceM2: number;
    totalPrice: number;
    bedrooms: number;
    features: string[]
    squareMeters: number
}

export const calculateAverageValueBySize = (properties: Property[]): { lessThan100SqM: number, moreThan100SqM: number }  => {
    const small = properties.filter(p => p.squareMeters < 100);
    const large = properties.filter(p => p.squareMeters >= 100);
  
    return {
      lessThan100SqM: calculateAveragePrice(small).averagePurchaseValue,
      moreThan100SqM: calculateAveragePrice(large).averagePurchaseValue
    };
}