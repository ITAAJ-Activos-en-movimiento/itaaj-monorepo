interface Property {
    bathrooms: number;
    pricePerSqM: number;
}

function calculatePricesByBathrooms(properties: Property[]) {
    const accumulators = {
      oneBathroom: { total: 0, count: 0 },
      twoBathrooms: { total: 0, count: 0 },
      threeBathrooms: { total: 0, count: 0 },
      fourOrMoreBathrooms: { total: 0, count: 0 }
    };
  
    properties.forEach(property => {
      switch (true) {
        case property.bathrooms === 1:
          accumulators.oneBathroom.total += property.pricePerSqM;
          accumulators.oneBathroom.count++;
          break;
        case property.bathrooms === 2:
          accumulators.twoBathrooms.total += property.pricePerSqM;
          accumulators.twoBathrooms.count++;
          break;
        case property.bathrooms === 3:
          accumulators.threeBathrooms.total += property.pricePerSqM;
          accumulators.threeBathrooms.count++;
          break;
        case property.bathrooms >= 4:
          accumulators.fourOrMoreBathrooms.total += property.pricePerSqM;
          accumulators.fourOrMoreBathrooms.count++;
          break;
      }
    });
  
    // Calculate averages
    return {
      oneBathroom: accumulators.oneBathroom.count > 0 ? accumulators.oneBathroom.total / accumulators.oneBathroom.count : 0,
      twoBathrooms: accumulators.twoBathrooms.count > 0 ? accumulators.twoBathrooms.total / accumulators.twoBathrooms.count : 0,
      threeBathrooms: accumulators.threeBathrooms.count > 0 ? accumulators.threeBathrooms.total / accumulators.threeBathrooms.count : 0,
      fourOrMoreBathrooms: accumulators.fourOrMoreBathrooms.count > 0 ? accumulators.fourOrMoreBathrooms.total / accumulators.fourOrMoreBathrooms.count : 0
    };
  }