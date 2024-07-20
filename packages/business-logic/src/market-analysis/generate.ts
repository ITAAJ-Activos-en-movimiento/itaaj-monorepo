import { Development } from "@itaaj/entities";
import { centuryScrapping } from "./scrapping-century";
import { calculatePricesByBedrooms } from "../price-index";
import { remaxScrapping } from "./scrapping-remax";

const samples: Record<number, number> = {
  2: 1.880, 3: 1.024, 4: 0.729, 5: 0.577, 6: 0.483, 7: 0.419, 8: 0.373, 9: 0.337,
  10: 0.308, 11: 0.285, 12: 0.266, 13: 0.249, 14: 0.235, 15: 0.223, 16: 0.212,
  17: 0.203, 18: 0.194, 19: 0.187, 20: 0.180, 21: 0.180, 22: 0.180, 23: 0.180,
  24: 0.180, 25: 0.153
};

interface PropertyData {
  precios: {
    vista: { precio: number };
    contrato: number | null;
    principal: number | null;
  };
  m2T: number;
  m2C: number;
  recamaras: number;
  banos: number;
  fechaAlta: string;
  fechaModificacion: string;
}

interface AdjustedPriceData {
  adjustedPricePerSquareMeter: number;
  upperLimit: number;
  lowerLimit: number;
  median: number;
  dataPoints: {price: number, included: boolean}[];
}

export const generateMarketAnalysis = async ({ state, municipality, neighborhood, maxPrice }: { state: string, municipality: string, neighborhood: string, maxPrice: number }) => {
  
  
  try {
    let properties: PropertyData[] = await centuryScrapping({ state, municipality, neighborhood });
    const remaxProperties =  await remaxScrapping();
    
    properties.push(...remaxProperties)
    
    properties = properties.filter(property => 
      property.precios.vista.precio !== null && 
      property.m2C > 0 &&
      property.precios.vista.precio <= maxPrice
    );



    const pricesPerSquareMeter = properties.map(property => 
      property.precios.vista.precio / (property.m2C + property.m2T)
    );

    const adjustedPriceData = calculateAdjustedPricePerSquareMeter(pricesPerSquareMeter);

    const adjustedProperties = properties.map(property => ({
      ...property,
      adjustedPrice: adjustedPriceData.adjustedPricePerSquareMeter * (property.m2C + property.m2T),
      adjustedPricePerSquareMeter: adjustedPriceData.adjustedPricePerSquareMeter
    }));

    const averageAdjustedPrice = calculateAverage(adjustedProperties.map(p => p.adjustedPrice));
    const priceDistribution = calculatePriceDistribution(adjustedProperties);
    const standardDeviation = calculateStandardDeviation(adjustedProperties.map(p => p.adjustedPricePerSquareMeter));

    return {
      properties: adjustedProperties,
      averagePrice: averageAdjustedPrice,
      pricePerSquareMeter: adjustedPriceData.adjustedPricePerSquareMeter,
      priceDistribution,
      standardDeviation,
      amount: properties.length,
      upperLimit: adjustedPriceData.upperLimit,
      lowerLimit: adjustedPriceData.lowerLimit,
      median: adjustedPriceData.median,
      dataPoints: adjustedPriceData.dataPoints,
    };
  } catch (error) {
    console.error("Error in generateMarketAnalysis:", error);
    throw error;
  }
};

function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculatePriceDistribution(properties: (PropertyData & { adjustedPrice: number })[]): Record<string, number> {
  const prices = properties.map(p => p.adjustedPrice);
  return {
    "<1M": prices.filter(p => p < 1000000).length,
    "1M-2M": prices.filter(p => p >= 1000000 && p < 2000000).length,
    "2M-3M": prices.filter(p => p >= 2000000 && p < 3000000).length,
    "3M-4M": prices.filter(p => p >= 3000000 && p < 4000000).length,
    ">4M": prices.filter(p => p >= 4000000).length,
  };
}

function calculateStandardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const average = calculateAverage(values);
  const squareDiffs = values.map(value => {
    const diff = value - average;
    return diff * diff;
  });
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function calculateAdjustedPricePerSquareMeter(pricesPerSquareMeter: number[]): AdjustedPriceData {

  if (pricesPerSquareMeter.length === 0) {
    return {
      adjustedPricePerSquareMeter: 0,
      upperLimit: 0,
      lowerLimit: 0,
      median: 0,
      dataPoints: []
    };
  }

  pricesPerSquareMeter.sort((a, b) => a - b);
  const n = pricesPerSquareMeter.length;
  const range = pricesPerSquareMeter[n - 1] - pricesPerSquareMeter[0];
  const centralLimit = calculateAverage(pricesPerSquareMeter);

  const sampleFactor = n > 25 ? 0.153 : samples[n] || 0.153;
  const upperLimit = centralLimit + (range * sampleFactor);
  const lowerLimit = centralLimit - (range * sampleFactor);
  const median = calculateMedian(pricesPerSquareMeter);

  const filteredPrices = pricesPerSquareMeter.filter(p => p >= lowerLimit && p <= upperLimit);
  const adjustedPricePerSquareMeter = calculateAverage(filteredPrices);

  const dataPoints = pricesPerSquareMeter.map(price => ({
    price,
    included: price >= lowerLimit && price <= upperLimit
  }));


  return {
    adjustedPricePerSquareMeter,
    upperLimit,
    lowerLimit,
    median,
    dataPoints
  };
}

function calculateDaysListed(listingDate: string): number {
  const today = new Date();
  const publishedDate = new Date(listingDate);
  const timeDifference = today.getTime() - publishedDate.getTime();
  return Math.floor(timeDifference / (1000 * 3600 * 24));
}