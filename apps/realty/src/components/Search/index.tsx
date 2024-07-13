"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import SearchForm from './SearchForm';
import Map from './Map';
import styles from "./Search.module.css"
import { X } from 'react-feather';


export default function Search() {
  const [searchParams, setSearchParams] = useState(null);
  const [results, setResults] = useState([]);

  const handleSearch = async (params: any) => {
    setSearchParams(params);
    try {
      const response = await fetch('http://localhost:8000/api/v1/search/calculate-polygon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  return (
    <div className={styles.overlay} >

    <div className={styles.container}>
        <div className={styles.header}>
            <h2>Búsqueda por Trayecto</h2>
            <button><X  size={18} /></button>
        </div>
        <div className={styles.content} >

      <SearchForm onSearch={handleSearch} />
      <Map
        googleMapsApiKey="AIzaSyA5SAL5LaKBmpsUYh1KUkeGyBBIeWMtJEg"
        searchParams={searchParams}
        results={results}
      />
        </div>

    </div>
    </div>

  );
}



