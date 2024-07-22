"use client"
import React, { ReactNode } from 'react'
import styles from "./Container.module.css"
import { useMap } from '../../context/MapContext';

const Container = ({ children }: { children: ReactNode }) => {
    const { isMapOpen } = useMap();
  return (
    <div className={isMapOpen? styles.content : styles.container} >
        {children}
    </div>
  )
}

export default Container