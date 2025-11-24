"use client";
import React, { useEffect, useState } from "react";
import { APIProvider, Map as MapView, Marker } from "@vis.gl/react-google-maps";
import styles from "./Map.module.css";
import { useMap } from "../../context/MapContext";
import { X } from "react-feather";

const Map = ({ properties }: { properties: any }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const { isMapOpen, closeMap } = useMap();

  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    setHidden(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mapOffset = scrollTop * 0.5;

  if (!isMapOpen) {
    return (
      <div style={{ display: "none" }} /> // mantiene vivo el mapa
    );
  }

  useEffect(() => {
    return () => {
      const mapContainer = document.querySelector(".mapboxgl-map, .gm-style");
      if (mapContainer && mapContainer.parentNode) {
        try {
          mapContainer.parentNode.removeChild(mapContainer);
        } catch (_) {}
      }
    };
  }, []);
  return (
    <APIProvider apiKey="AIzaSyDkIBMfRbprW49ISOGe6gS70OOVq79SnhI">
      <MapView
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "45%",
          height: "100vh",
          transition: "0.3s",
          marginTop: mapOffset > 10 ? (mapOffset > 2600 ? -1200 : 0) : 116,
        }}
        defaultCenter={{
          lat: properties.items[0]?.location.latitude,
          lng: properties.items[0]?.location.longitude,
        }}
        defaultZoom={4}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {properties.items.map((property: any) => (
          <Marker
            key={property.id}
            position={{
              lat: property.location.latitude,
              lng: property.location.longitude,
            }}
          />
        ))}
        <button onClick={closeMap} className={styles.btn_close}>
          {" "}
          <X color="var(--main-color)" size={24} />{" "}
        </button>
      </MapView>
    </APIProvider>
  );
};

export default Map;
