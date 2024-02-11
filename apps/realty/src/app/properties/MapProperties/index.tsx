'use client'
import { GoogleMap, LoadScriptNext, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'

const MapProperties = ({ locations }: { locations: { latitude: number, longitude: number }[] }) => {
  const center = { lat: locations[6]?.longitude, lng: locations[6]?.latitude }

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
        mapContainerStyle={{ height: "100vh", width: "100%"}}
        center={center}
        zoom={250}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {locations.map((location, index) => (
        <MarkerF key={location.latitude + location.longitude + index} icon={
          {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: { width: 50, height: 50, equals: () => true },
          }
        } position={{ lat: location?.longitude, lng: location?.latitude }} />
        ))}  
        </GoogleMap>
    </LoadScriptNext>) : <></>
}

export default MapProperties