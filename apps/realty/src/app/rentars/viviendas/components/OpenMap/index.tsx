"use client"
import React from 'react'
import { useMap } from '../../context/MapContext';
import { Map } from 'react-feather';
import styles from "./OpenMap.module.css"

const OpenMap = () => {
    const { isMapOpen, openMap } = useMap();

  return (
    <>
    {!isMapOpen && (
        <button className={styles.btn} onClick={openMap} ><Map /> Ver mapa</button>

    )}
    </>
  )
}

export default OpenMap