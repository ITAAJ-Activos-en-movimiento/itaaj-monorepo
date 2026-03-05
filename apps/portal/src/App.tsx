import React, { useEffect, useState } from 'react';
import { initializeMap } from './mapUtils';

const API_KEY = "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"
const App: React.FC = () => {
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
        center: { lat: 6.2442, lng: -75.5812 },
        zoom: 11,
      });

      const medellinPolygon = new google.maps.Polygon({
        paths: [
          { lat: 6.328069, lng: -75.556126 },
          { lat: 6.309690, lng: -75.574708 },
          { lat: 6.283783, lng: -75.590458 },
          { lat: 6.259615, lng: -75.605736 },
          { lat: 6.230271, lng: -75.612388 },
          { lat: 6.195814, lng: -75.607925 },
          { lat: 6.176501, lng: -75.590458 },
          { lat: 6.171205, lng: -75.558229 },
          { lat: 6.186452, lng: -75.527201 },
          { lat: 6.216631, lng: -75.515184 },
          { lat: 6.248190, lng: -75.513296 },
          { lat: 6.280307, lng: -75.522738 },
          { lat: 6.309690, lng: -75.539304 },
          { lat: 6.328069, lng: -75.556126 }
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

export default App;