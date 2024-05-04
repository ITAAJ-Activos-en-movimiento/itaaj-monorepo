"use client";
import { PropertyElement } from "@/components/Developments";
import React, { Fragment, useState } from "react";
import styles from "./PropertyElement.module.css";
import { DivisaFormater } from "@/utils";
import Link from "next/link";
import Floorplans from "./Plane";
import { Cform } from "@/components/Contacts";
import Modal from "react-modal";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "react-feather";

const Properties = ({ properties }: { properties: unknown[] }) => {
  const [prop, setProp] = useState(properties)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const params = useSearchParams();
  const openProposal = params.get("plane");
  const router = useRouter()

  const [actualImg, setActualImg] = useState("")

  function openPlane(img: string) {
    setActualImg(img)
    router.push('?plane=open', { scroll: false })
  }
  
  function closeModal() {
    router.push('?plane=close', { scroll: false })
    setModalIsOpen(false);
  }
  
  return (
    <>
      {prop?.map((property: any) => (
        <Fragment key={property.id}>
          <div className={styles.property}>
            <h4 className={styles.price}>
              {DivisaFormater({ value: property.price })}
            </h4>
            <span>{property.bedrooms} habs.</span>
            <span>{property.bathrooms} baños</span>
            <span>{property.total_area} m2</span>
            <h4>{property.floor}a Planta</h4>
            <button onClick={() => openPlane(property.image)}>Mostrar plano</button>
            <button onClick={() => setModalIsOpen(true)} className={styles.btn}>Contactar</button>
            <div
              className={
                openProposal == null || openProposal == "close"
                  ? styles.container
                  : styles.open
              }
            >
              <div className={styles.header}>
                <button onClick={closeModal}>
                  <X /> Cerrar
                </button>
                <div>
                  <p>{property.bedrooms} habs.</p>
                  <p>{property.bathrooms} baños</p>
                  <p>{property.area.total_area} m2</p>
                </div>
                <div className={styles.re}></div>
              </div>

              <div className={styles.img}>
                <Image
                  src={actualImg}
                  width={1000}
                  height={800}
                  alt="IMAGE"
                />
              </div>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Contacto"
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
              content: {
                width: "33rem",
                height: "50rem",
                margin: "auto", // Center the modal horizontally
                padding: "0px",
                border: "none",
              },
            }}
          >
            <Cform
              slug={"SDEV@" + property.slug}
              closeModal={closeModal}
              prevmsg={"Me interesa Inmueble: " + property.slug}
            />
          </Modal>
        </Fragment>
      ))}
    </>
  );
};

export default Properties;
