import axios from "axios";

const GOOGLE_MAPS_APY_KEY = "AIzaSyAqpZ9BOU4cmaBgbh0DGnAuJcLWd_O8gvU"

export const calculatePolygon = async ({ address, maxTime, transport }:{ address: string, maxTime: number, transport: string }) => {
    const apiKey = GOOGLE_MAPS_APY_KEY;
    const origin = await geocodeAddress(address);
    const points = [];
    for (let angle = 0; angle < 360; angle+=10) {
        const destination = destinationPoint(origin, maxTime * 1000, angle);
        points.push(destination);
    }


    const routes = await Promise.all(points.map((point) => getRoute(origin, point, transport, apiKey)));
    const polygonPoints = routes.filter(route => route.duration <= maxTime * 180)
    .map(route => route.endLocation);

    return polygonPoints;
}


const geocodeAddress = async (address: string) => {
    try{ 
        const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: address,
            key: GOOGLE_MAPS_APY_KEY
        }
    });
    return data.results[0].geometry.location;
    }catch(err){
        console.log(err)
    }
   
}

function destinationPoint(start, distance, bearing) {
    const R = 6371e3; // Earth's radius in meters
    const δ = distance / R; // angular distance in radians
    const θ = bearing * Math.PI / 180; // bearing in radians
    const φ1 = start.lat * Math.PI / 180;
    const λ1 = start.lng * Math.PI / 180;
  
    const sinφ2 = Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ);
    const φ2 = Math.asin(sinφ2);
    const y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    const x = Math.cos(δ) - Math.sin(φ1) * sinφ2;
    const λ2 = λ1 + Math.atan2(y, x);
  
    return {
      lat: φ2 * 180 / Math.PI,
      lng: ((λ2 * 180 / Math.PI) + 540) % 360 - 180 // normalize to -180..+180
    };
}

async function getRoute(origin, destination, mode, apiKey) {
    try{

    
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        mode: mode.toLowerCase(),
        key: apiKey
      }
    });
  
    if (response.data.routes.length > 0) {
      const route = response.data.routes[0].legs[0];
      return {
        duration: route.duration.value,
        endLocation: route.end_location
      };
    } else {
      throw new Error('Route calculation failed');
    }
}catch(err){
    // console.log(err)
}
}