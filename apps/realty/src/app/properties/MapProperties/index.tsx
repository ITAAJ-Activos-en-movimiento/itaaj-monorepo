'use client'
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

const MapProperties = ({ locations }: { locations: { latitude: number, longitude: number }[] }) => {
  console.log(locations)
  return (
    <LoadScriptNext  googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%", position: "fixed",
        top: 0,
        right: 0 }}
        center={{ lat: 19.4326, lng: -99.1332 }}
        zoom={18}
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
    </LoadScriptNext>
  )
}

export default MapProperties