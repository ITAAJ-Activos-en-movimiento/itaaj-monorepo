"use client"
import React, { useState } from 'react'
import styles from "../Properties.module.css";

const Search = ({ value }: { value?: string }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        // Actualizar la URL con el nuevo parámetro de búsqueda
        window.location.href = `?search=${selectedValue}`;


      };
    
  return (
          <select onChange={handleSelectChange} value={value} name="" id="">
          <option value="">Estado</option>
          <option value="Ciudad de México">Ciudad de México</option>
          <option value="Estado de México">Estado de México</option>
          <option value="Morelos">Morelos</option>
          <option value="Yucatán">Yucatán</option>
          <option value="Tulum">Tulum</option>
          <option value="Quintana Roo">Quintana Roo</option>
        </select>
  )
}

export default Search