'use client'

import { fetchMyProperties } from "@/services"
import { useEffect } from "react"

const Properties = () => {
  const fetchProperties = async () => {
    const response = await fetchMyProperties(1);
    console.log(response);
  }

  useEffect(() => {
    fetchProperties()
    return () => {};
  }, [])
  
  return (
    <div>Propiedades</div>
  )
}

export default Properties