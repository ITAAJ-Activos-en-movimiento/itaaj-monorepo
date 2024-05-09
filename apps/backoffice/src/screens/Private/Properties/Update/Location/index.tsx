import { Field, Input } from "@/components";
import styles from "./Location.module.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
import axios from "axios";

interface ubicationProps {
  longitud: number;
  latitud: number;
  setLatitud: (lat: number) => void;
  setLongitud: (lng: number) => void;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Location = ({
  longitud,
  latitud,
  setLatitud,
  setLongitud,
  address,
  city,
  state,
  country,
  zipcode,
  handleChange,
}: ubicationProps) => {
  const obtenerCoordenadas = () => {
    const addressUpdate = address + " " + city + " " + state + " " + country;
    const direccionFormateada = addressUpdate.split(" ").join("+");
    const API_KEY = "AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"; // Reemplaza con tu propia API key de Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccionFormateada}&key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        const { results } = response.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setLatitud(lat);
          setLongitud(lng);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las coordenadas", error);
      });
  };

  // const addressUpdate = address + " " + city + " " + state + " " + country;

  useEffect(() => {
    setTimeout(() => {
      obtenerCoordenadas();
    }, 3000);
  }, [address, city, state, country]);

  return (
    <div className={styles.content}>
      <h3>Editar Detalles de ubicación</h3>

      <Field label="Dirección">
        <Input value={address} name="address" onChange={handleChange} />
      </Field>

      <div className={styles.col}>
        <Field label="Ciudad">
          <Input value={city} name="city" onChange={handleChange} />
        </Field>

        <Field label="Estado">
          <Input value={state} name="state" onChange={handleChange} />
        </Field>
      </div>

      <div className={styles.col}>
        <Field label="Codigo postal">
          <Input value={zipcode} name="zipcode" onChange={handleChange} />
        </Field>

        <Field label="Pais">
          <Input value={country} name="country" onChange={handleChange} />
        </Field>
      </div>

      <Field>
        <LoadScript googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg">
          <GoogleMap
            mapContainerStyle={{ height: "500px", width: "100%" }}
            center={{ lat: latitud, lng: longitud }}
            zoom={18}
          >
            <MarkerF
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: { width: 50, height: 50, equals: () => true },
              }}
              position={{ lat: latitud, lng: longitud }}
            />
          </GoogleMap>
        </LoadScript>
      </Field>
    </div>
  );
};

export default Location;
