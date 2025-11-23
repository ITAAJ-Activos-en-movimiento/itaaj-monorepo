import { initializeMap } from "@/utils/mapUtils";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// AIzaSyB6AG46qRvfB3dC3XEmucMvacwZ6SAmTbE
export default function Map({ googleMapsApiKey, searchParams, results }: any) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const [center, setCenter] = useState<any>({ lat: 40.4168, lng: -3.7038 });
  const [polygon, setPolygon] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    initializeMap().then(() => {
      setMapLoaded(true);
    });

    loadMapScript();
  }, []);

  // useEffect(() => {
  //   if (searchParams && searchParams.address) {
  //     // Geocode the address and set the center
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ address: searchParams.address }, (results, status) => {
  //       if (status === 'OK') {
  //         setCenter(results?.[0].geometry.location.toJSON());
  //       }
  //     });

  //     // Calculate and set the polygon
  //     calculatePolygon(searchParams);
  //   }
  // }, [searchParams]);

  const calculatePolygon = async (params: any) => {
    const { address, maxTime, transport } = params;
    try {
      const response = await fetch("/api/calculatePolygon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, maxTime, transport }),
      });
      const data = await response.json();
      setPolygon(data.polygon);
      return data.polygon;
    } catch (error) {
      console.error("Error calculating polygon:", error);
    }
  };

  useEffect(() => {
    if (mapLoaded) {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: center,
          zoom: 8,
        }
      );
      if (searchParams && searchParams.address) {
        // Geocode the address and set the center
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: searchParams.address },
          (results, status) => {
            if (status === "OK") {
              setCenter(results?.[0].geometry.location.toJSON());
            }
          }
        );

        const calculatePolygon = async (params: any) => {
          const { address, maxTime, transport } = params;
          try {
            const response = await fetch(
              "https://itaajrealty.com/api/v1/search/calculate-polygon",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, maxTime, transport }),
              }
            );

            const { data: dataProps } = await axios(
              "https://itaaj-realty.onrender.com/api/v1/properties?page=1&limit=40"
            );
            const newLocations = dataProps.items.map((property: any) => ({
              name: property.name,
              lat: property.location.latitude,
              lng: property.location.longitude,
            }));
            const locations = newLocations.filter(
              (loca: any) => loca.latitude !== 0
            );
            const data = await response.json();

            console.log(locations);
            const CityPol = new google.maps.Polygon({
              paths: data,
              strokeColor: "#0000FF",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#0000FF",
              fillOpacity: 0.35,
            });
            CityPol.setMap(map);
            locations.forEach((location: any) => {
              new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                title: location.name,
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              });
            });
          } catch (error) {
            console.error("Error calculating polygon:", error);
          }
        };

        // Calculate and set the polygon

        calculatePolygon(searchParams);
      }
    }
  }, [searchParams, mapLoaded]);
  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
