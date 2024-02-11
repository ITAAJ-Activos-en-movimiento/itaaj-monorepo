"use client"
import React, { useState } from 'react'
import styles from "../Banner.module.css"
import { Search } from 'react-feather'
import Link from 'next/link'

function SearchProperties() {
  const [ type, setType ] = useState("Departamento");
  const [ search, setSearch ] = useState("");

  return (
    <div className={styles.params}>
    <select onChange={({target}) => setType(target.value)}>
      <option value="Departamento">Departamentos</option>
      <option value="Obra nueva">Obra nueva</option>
      <option value="Promociones">Promociones</option>
      <option value="Oficna">Oficina</option>
      <option value="Terreno">Terreno</option>
      <option value="Edifico">Edificio</option>
      <option value="house">Casa</option>
    </select>
    <div>
      <input type="search" onChange={({target}) => setSearch(target.value)} placeholder='Buscar propiedades en estados, etc...' />
      <Link href={`/properties?type=${type}&search=${search}`} className={styles.btn} ><Search size={20} /> <span>Buscar</span></Link>
    </div>
  </div>
  )
}

export default SearchProperties