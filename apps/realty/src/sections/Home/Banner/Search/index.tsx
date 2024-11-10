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
 
    <select onChange={({ target }) => setSearch(target.value)} value={search} name="" id="">
          <option value="Estado">Estado</option>
          <option value="Ciudad de México">Ciudad de México</option>
          <option value="Estado de México">Estado de México</option>
          <option value="Morelos">Morelos</option>
          <option value="Yucatán">Yucatán</option>
          <option value="Quintana Roo">Quintana Roo</option>
        </select>
      {/* <input type="search" onChange={({target}) => setSearch(target.value)} placeholder='Buscar propiedades en estados, etc...' /> */}
      <Link href={`/comprar/viviendas?search=${search}`} className={styles.btn} ><Search size={20} /> <span>Buscar</span></Link>
  
  </div>
  )
}

export default SearchProperties