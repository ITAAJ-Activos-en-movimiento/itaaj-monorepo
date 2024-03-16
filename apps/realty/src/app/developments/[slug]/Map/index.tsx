'use client'
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

const Map = ({ location }: any) => {
  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={{ lat: location?.latitude, lng: location?.longitude }}
        zoom={18}
      >
        <MarkerF icon={
          {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: { width: 50, height: 50, equals: () => true },
          }
        } position={{ lat: location?.latitude, lng: location?.longitude }} />
      </GoogleMap>
    </LoadScriptNext>
  )
}

export default Map