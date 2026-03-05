"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type MapProps = {
  lat: number;
  lng: number;
  onPositionChange?: (lat: number, lng: number) => void;
};

const containerStyle = {
  width: "100%",
  height: "24rem", // asegúrate que tenga altura
};

export default function Map({ lat, lng, onPositionChange }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "itaaj-map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) {
    return <div>Error cargando el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa…</div>;
  }

  const position = {
    lat: Number(lat),
    lng: Number(lng),
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={16}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker
        key={`${position.lat}-${position.lng}`}
        position={position}
        title="Ubicacion"
        draggable
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // 👈 igual que el mapa viejo
        onDragEnd={(e) => {
          const newLat = e.latLng?.lat();
          const newLng = e.latLng?.lng();
          if (
            typeof newLat === "number" &&
            typeof newLng === "number" &&
            onPositionChange
          ) {
            onPositionChange(newLat, newLng);
          }
        }}
      />
    </GoogleMap>
  );
}
