import { Field, Input } from '@/components'
import styles from './Location.module.css'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { useEffect } from 'react'
import axios from 'axios'

const Location = ({longitud, latitud, setLatitud, setLongitud, formState, handleChange}: any) => {
  const obtenerCoordenadas = () => {
    const address = formState?.address+' '+formState?.city+' '+formState?.state+' '+formState?.country;
    const direccionFormateada = address.split(" ").join("+");
    const API_KEY = "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"; // Reemplaza con tu propia API key de Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccionFormateada}&key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        const { results } = response.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setLatitud(lat);
          setLongitud(lng);
        }
        console.log({results})
      })
      .catch((error) => {
        console.error("Error al obtener las coordenadas", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      obtenerCoordenadas();
    }, 3000)
  }, [formState]);

  return (
    <div className={styles.content}>
    <h3>General details</h3>
    <p className={styles.subtitle}>A brief description of these settings</p>

    <Field label='Calle y Colonia'>
        <Input  name='address' onChange={handleChange} />
    </Field>

    <div className={styles.col}>

    <Field label='Alcaldia/Municipio/Poblado'>
        <Input name='city' onChange={handleChange} />
    </Field>

    <Field label='Estado'>
        <Input name='state' onChange={handleChange} />
    </Field>
    </div>

    <div className={styles.col}>

    <Field label='Código postal'>
        <Input name='zipcode' onChange={handleChange} />
    </Field>

    <Field label='País'>
        <Input name='country' onChange={handleChange}  />
    </Field>
    </div>
    {/* <Formulario formState={formState} latitud={latitud} longitud={longitud} setLatitud={setLatitud} setLongitud={setLongitud} /> */}
  
    <Field>
    <LoadScript googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
          <GoogleMap
            mapContainerStyle={{ height: "500px", width: "100%" }}
            center={{ lat: latitud, lng: longitud }}
            zoom={18}
          >
            <MarkerF icon={
              {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: { width: 50, height: 50, equals: () => true},
              }
            } position={{ lat: latitud, lng: longitud }} />
          </GoogleMap>
        </LoadScript>
    </Field>

</div>
  )
}

export default Location