'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from "../../Buy.module.css";
import { Bell } from "react-feather";

const FilterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    estado: '',
    tipo: '',
    tipoConstruccion: '',
    precio: '',
    habitaciones: '',
    banos: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    // Actualizar o eliminar los parámetros de filtro
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    // Restablecer la página a 1 cuando se aplican nuevos filtros
    newSearchParams.set('page', '1');

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.header}>
      <select name="estado" onChange={handleChange} value={filters.estado}>
        <option value="">Estado</option>
        <option value="ciudad-de-mexico">Ciudad de México</option>
      </select>
      <select name="tipo" onChange={handleChange} value={filters.tipo}>
        <option value="">Tipo</option>
        <option value="Casa">Casa</option>
        <option value="Departamento">Departamento</option>
        <option value="Terreno">Terreno</option>
      </select>
      <select name="tipoConstruccion" onChange={handleChange} value={filters.tipoConstruccion}>
        <option value="">Tipo de construcción</option>
        <option value="nueva">Obra nueva</option>
        <option value="usada">Vivienda usada</option>
      </select>
      <select name="precio" onChange={handleChange} value={filters.precio}>
        <option value="">Precio</option>
        {/* Añade opciones de rangos de precios */}
      </select>
      <select name="habitaciones" onChange={handleChange} value={filters.habitaciones}>
        <option value="">Habitaciones</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
      <select name="banos" onChange={handleChange} value={filters.banos}>
        <option value="">Baños</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
      <button onClick={applyFilters}>
        Aplicar filtros
      </button>
      <button>
        <Bell size={18} />
        Crear alerta
      </button>
    </div>
  );
};

export default FilterForm;