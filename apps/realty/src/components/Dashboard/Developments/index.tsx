'use client'

import { fetchMyDevelopments } from "@/services";
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "./style.module.css";
import { DivisaFormater } from "@/utils";

interface DevelopmentsProps {
  id: string
  name: string
  price: number
  city: string
  state: string
  images: string[]
  type: string
  createdAt: Date
  address: string
}

const Developments = () => {
  const [developments, setDevelopments] = useState<DevelopmentsProps[]>([]);
  
  const fetchDevelopments = async () => {
    const response = await fetchMyDevelopments(1);
    setDevelopments(response);
  }

  useEffect(() => {
    fetchDevelopments()
    return () => {};
  }, [])
  
  return (
    <>
      <span>Se encontraron <b>{developments.length} avisos</b></span>
      <section className={styles.containerDevelop}>
        {
          developments.map((item, index) => (
            <article className={styles.development} key={index}>
              <div className={styles.developmentBody}>
                <div className={styles.developmentContainDescrip}>
                  <Image alt={item.name} src={item.images[0]} width={200} height={200} />
                  
                  <div className={styles.developmentDescrip}>
                    <div className={styles.developmentType}>
                      <span>{item.type}</span>
                      <span className={styles.developmentState}>Activo</span>
                    </div>
                    <div className={styles.developmentDetail}>
                      <span>{item.name} en {item.city}</span>
                      <span>{item.state}</span>
                      <span>Venta <b>{DivisaFormater({value: item.price})}</b></span>
                    </div>
                  </div>
                </div>
                
                {/* <div>
                  <span>Interesado</span>
                  <div>
                    <span>1</span>
                    <span>Ver consultas</span>
                  </div>
                </div> */}
              </div>
              <div className={styles.developmentFooter}>
                <span>ID <b>{item.id}</b></span>
                <span>Inicio {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          ))
        }
      </section>
    </>
  )
}

export default Developments