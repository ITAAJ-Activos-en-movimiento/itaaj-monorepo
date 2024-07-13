"use client"
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import Map from './Map';
import styles from "./Search.module.css"
import { X } from 'react-feather';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function Search() {
  const searchParamsRoute = useSearchParams();

  const [searchParams, setSearchParams] = useState(null);
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
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

  const router = useRouter();
  const pathname = usePathname();

  const cleanSearchParams = () => {
    router.push(pathname);
  };

  useEffect(() => {
    if (searchParamsRoute.get('search') === 'route') {
      setOpen(true);
    }
  }, [searchParamsRoute]);

  useEffect(() => {
    if (!open) {
        cleanSearchParams()
    }
  }, [open]);

  return (
    <>
    {open && (

    <div className={styles.overlay} >
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Búsqueda por Trayecto</h2>
                <button onClick={() => setOpen(false)} ><X  size={18} /></button>
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
    )}

</>


  );
}



