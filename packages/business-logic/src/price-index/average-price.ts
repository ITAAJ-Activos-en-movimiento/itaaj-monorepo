
interface Property{
  priceM2?: number;
  totalPrice?: number;
  bedrooms?: number;
}

export const calculateAveragePrice = (properties: Property[])  => {
    const totalProperties = properties.length;
    const sumPricesM2 = properties.reduce((sum, prop) => sum + prop.priceM2, 0);
    const sumPricesTotals = properties.reduce((sum, prop) => sum + prop.totalPrice, 0);
  
    return {
      averagePricePerSqM: sumPricesM2 / totalProperties,
      averagePurchaseValue: sumPricesTotals / totalProperties
    };
}

  