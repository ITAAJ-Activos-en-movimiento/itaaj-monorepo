import { useState } from "react";
import styles from "./Search.module.css"
import { User } from "react-feather";
import { Bicycle, Walk, Car, Bus } from "react-ionicons";

export default function SearchForm({ onSearch }: any) {
    const [address, setAddress] = useState('');
    const [maxTime, setMaxTime] = useState(45);
    const [transport, setTransport] = useState('DRIVING');
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      onSearch({ address, maxTime, transport });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.field} >
        <label htmlFor="">Dirección de referencia</label>
        <input
        className={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Tu trabajo, escuela, etc..."
        />
        </div>

        <div className={styles.field} >
            <div className={styles.field_flex} >
                <label htmlFor="">Tiempo máximo de viaje</label>
                <span>{maxTime} minutos</span>
            </div>
            <input
          type="range"
          min="5"
          max="60"
          value={maxTime}
          onChange={(e) => setMaxTime(parseInt(e.target.value))}
        />

        </div>

        <div className={styles.field_mid} >
        <label htmlFor="">¿Como te desplazas?</label>
        <div className={styles.buttons} >
            <button className={transport == "WALKING" ? styles.active : ""} onClick={() => setTransport("WALKING")}  type="button" > <Walk /> </button>
            <button className={transport == "BICYCLING" ? styles.active : ""} onClick={() => setTransport("BICYCLING")} type="button" > <Bicycle /> </button>
            <button className={transport == "DRIVING" ? styles.active : ""} onClick={() => setTransport("DRIVING")} type="button" > <Car /> </button>
            <button className={transport == "TRANSIT" ? styles.active : ""} onClick={() => setTransport("TRANSIT")} type="button" > <Bus /> </button>
        </div>
        </div>

        <button className={styles.submit} type="submit">Mostrar resultados</button>
      </form>
    );
  }
  