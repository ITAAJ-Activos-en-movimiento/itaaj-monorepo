'use client'
import { GoogleMap, LoadScriptNext, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import styles from "../Properties.module.css"
import { ChevronLeft, ChevronRight, X } from 'react-feather'

const MapProperties = ({ locations, scrollTop, onHidden }: { locations: { latitude: number, longitude: number }[], scrollTop:any,  onHidden: () => void }) => {
  const center = { lat: -105.78934677418087, lng:  25.61970064377464}
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.set
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"
  })

  const [width, setWidth] = useState("50%")
  const [isExpand, setIsExpand] = useState(false)

  const handleExpand = () => {
    // Aquí puedes implementar la lógica para expandir el mapa
    setIsExpand(!isExpand)
  };

  const hiddenMap = () => {
    // Aquí puedes implementar la lógica para expandir el mapa
    setIsExpand(!isExpand)
  };
  return isLoaded ?
    (
    <div style={{ position: "fixed", width: isExpand ? "100%" : "50%", right: 0, top: 0, marginBottom: '100px', zIndex: 9, transition: "0.3s", marginTop: scrollTop > 10 ? 0 : 116 }} >

    <LoadScriptNext  googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%"}}
        center={center}
        zoom={1000}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true, // Desactivar controles predeterminados del mapa
        }}
      >
   <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
            <button className={styles.btn_expand}  style={{
              backgroundColor: "#fff",
              
            }} onClick={handleExpand}> 
              {isExpand ? <>
                <ChevronRight size={30} /> Ver lista              

              </> : <>
              <ChevronLeft size={30} /> Expandir              
              </>}
            
            </button>
          </div>

          <div style={{ position: "absolute", top: "10px", right: "20px", zIndex: 1 }}>
            <button className={styles.btn_close}  style={{
              backgroundColor: "#fff",
              
            }} onClick={onHidden}> 
                <X size={30} />
            
            </button>
          </div>

        {locations.map((location, index) => (
        <MarkerF key={location.latitude + location.longitude + index} icon={
          {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: { width: 50, height: 50, equals: () => true },
          }
        } position={{ lat: location?.longitude, lng: location?.latitude }} />
        ))}  
        </GoogleMap>
    </LoadScriptNext> 
    </div>
    
    ) : <></>
}

export default MapProperties