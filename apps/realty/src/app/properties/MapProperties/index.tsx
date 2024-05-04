'use client'
import { GoogleMap, LoadScriptNext, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

const MapProperties = ({ locations }: { locations: { latitude: number, longitude: number }[] }) => {
  
  const center = { lat: locations[0]?.latitude, lng: locations[0]?.longitude }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"
  })

  return isLoaded ?
    (<LoadScriptNext  googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%", position: "fixed",
        top: 0,
        right: 0 }}
        center={center}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {locations.map((location, index) => (
        <MarkerF key={location.latitude + location.longitude + index} icon={
          {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: { width: 50, height: 50, equals: () => true },
          }
        } position={{ lat: location?.latitude, lng: location?.longitude }} />
        ))} 

        </GoogleMap>
    </LoadScriptNext>) : <></>
}

export default MapProperties