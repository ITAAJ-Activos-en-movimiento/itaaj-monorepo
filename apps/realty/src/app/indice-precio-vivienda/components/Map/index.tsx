"use client"
import { initializeMap } from '@/utils/mapUtils';
import React, { useEffect, useState } from 'react';

const API_KEY = "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"
const Map: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    initializeMap().then(() => {
      setMapLoaded(true);
    });

    loadMapScript();
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 19.4246, lng: -99.2142 },
        zoom: 11,
      });

      const medellinPolygon = new google.maps.Polygon({
        paths: [
            { lat: 19.4345, lng: -99.2260 },
            { lat: 19.4348, lng: -99.2245 },
            { lat: 19.4350, lng: -99.2230 },
            { lat: 19.4352, lng: -99.2215 },
            { lat: 19.4350, lng: -99.2200 },
            { lat: 19.4345, lng: -99.2185 },
            { lat: 19.4338, lng: -99.2170 },
            { lat: 19.4330, lng: -99.2155 },
            { lat: 19.4320, lng: -99.2140 },
            { lat: 19.4310, lng: -99.2125 },
            { lat: 19.4300, lng: -99.2110 },
            { lat: 19.4290, lng: -99.2095 },
            { lat: 19.4280, lng: -99.2080 },
            { lat: 19.4270, lng: -99.2065 },
            { lat: 19.4260, lng: -99.2050 },
            { lat: 19.4250, lng: -99.2035 },
            { lat: 19.4240, lng: -99.2020 },
            { lat: 19.4230, lng: -99.2005 },
            { lat: 19.4220, lng: -99.1990 },
            { lat: 19.4210, lng: -99.1975 },
            { lat: 19.4200, lng: -99.1990 },
            { lat: 19.4190, lng: -99.2005 },
            { lat: 19.4180, lng: -99.2020 },
            { lat: 19.4170, lng: -99.2035 },
            { lat: 19.4160, lng: -99.2050 },
            { lat: 19.4150, lng: -99.2065 },
            { lat: 19.4140, lng: -99.2080 },
            { lat: 19.4130, lng: -99.2095 },
            { lat: 19.4120, lng: -99.2110 },
            { lat: 19.4110, lng: -99.2125 },
            { lat: 19.4120, lng: -99.2140 },
            { lat: 19.4130, lng: -99.2155 },
            { lat: 19.4140, lng: -99.2170 },
            { lat: 19.4150, lng: -99.2185 },
            { lat: 19.4160, lng: -99.2200 },
            { lat: 19.4170, lng: -99.2215 },
            { lat: 19.4180, lng: -99.2230 },
            { lat: 19.4190, lng: -99.2245 },
            { lat: 19.4200, lng: -99.2260 },
            { lat: 19.4215, lng: -99.2270 },
            { lat: 19.4230, lng: -99.2280 },
            { lat: 19.4245, lng: -99.2290 },
            { lat: 19.4260, lng: -99.2300 },
            { lat: 19.4275, lng: -99.2295 },
            { lat: 19.4290, lng: -99.2290 },
            { lat: 19.4305, lng: -99.2285 },
            { lat: 19.4320, lng: -99.2280 },
            { lat: 19.4335, lng: -99.2275 },
            { lat: 19.4345, lng: -99.2260 }
        ],
        strokeColor: "#0000FF",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.35,
      });

      medellinPolygon.setMap(map);

      const locations = [
        { lat: 6.2476, lng: -75.5658, name: "Parque Lleras" },
        { lat: 6.2308, lng: -75.5906, name: "Pueblito Paisa" },
        { lat: 6.2699, lng: -75.5676, name: "Parque Explora" },
        { lat: 6.2334, lng: -75.5722, name: "Plaza Botero" },
        { lat: 6.2714, lng: -75.5657, name: "Jardín Botánico" },
      ];

      locations.forEach(location => {
        new google.maps.Marker({
          position: location,
          map: map,
          title: location.name,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
      });
    }
  }, [mapLoaded]);

  return <div id="map" style={{ width: '100%', height: '600px' }}></div>;
};

export default Map;