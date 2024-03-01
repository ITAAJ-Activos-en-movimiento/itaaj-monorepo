import React, { useEffect, useState } from "react";
import styles from "./Properties.module.css";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import { DivisaFormater } from "@/utils/divisa-formater";
import { useParams } from "next/navigation";
import { PropertyCard } from "@/components";
import { propertiesBySlug } from "@/services";
import Map from "@/app/developments/[slug]/Map";
import { changeLanguage } from "@/utils";
import Share from "./Share";
import Modal from "@/containers/Modal";
import Cform from "@/components/Contacts/Cform";
import { properties as propertiesApi } from "@/services";
const Property = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const property = await propertiesBySlug(params.slug.toString());
  const properties = await propertiesApi();

  // const prevImage = () => {
  //   if(actualImageIn == 0){
  //     setActualImageIn(property.images.length - 1);
  //   }else{
  //     setActualImageIn((prev) => prev - 1);
  //   }
  //   setActualImage(property.images[actualImageIn])
  // }

  // const nextImage = () => {
  //   const index = property.images.length;
  //   if(actualImageIn == index - 1){
  //     setActualImageIn(0);
  //   }else{
  //     setActualImageIn((prev) => prev + 1);
  //   }
  //   setActualImage(property.images[actualImageIn])
  // }

  const whatsappLink =
    typeof window !== "undefined"
      ? `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina itaajrealty.com por la siguiente propiedad ${window.location.href}`
      : `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina itaajrealty.com por la siguiente propiedad: https://itaajrealty.com/properties/${property.slug}`;

  // const fetchData =  async() => {
  //   setLoading(true);
  //       console.log(data)
  //       setProperty(data);
  //       setLoading(false)
  // }

  // useEffect(() => {
  //     fetchData();
  // }, [])

  // useEffect(() => {
  //     fetchData();
  // }, [])

  // if(loading) return <p>Cargando...</p>

  console.log("PROP", property);
  return (
    <>
      <div className={styles.header}>
        <Link href="/properties">
          <i className="bx bx-arrow-back"></i> Volver
        </Link>
      </div>

      <section className={styles.mosaic_grid}>
        {property?.images.slice(0, 5).map((img: string) => (
          <figure key={img}>
            <Image
              src={img}
              height="542"
              fetchPriority="high"
              loading="eager"
              width={948}
              alt={property?.description}
            />
          </figure>
        ))}
      </section>

      <div className={styles.container}>
        <div>
          <div className={styles.main}>
            <p className={styles.price}>
              Precio {DivisaFormater({ value: property?.price })}
            </p>
            <Share />
          </div>
          <Link href="?proposal=open" className={styles.price_sug}>
            <i className="bx bx-share-alt"></i> Realizar Propuesta
          </Link>
          <div className={styles.amenities}>
            <div>
              <i className="bx bx-bed"></i>
              <p>{property?.bedrooms} habs.</p>
            </div>
            <div>
              <i className="bx bx-bath"></i>
              <p>{property?.bathrooms} baños</p>
            </div>
            <div>
              <i className="bx bx-area"></i>
              <p>{property?.area.total_area} m&sup2;</p>
            </div>
            <div>
              <i className="bx bx-building-house"></i>
              <p>{property?.foor} planta</p>
            </div>
          </div>
          <h2 className={styles.title_property}>
            <strong>{changeLanguage(property?.type)}</strong> en venta en{" "}
            {property?.city}
          </h2>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: property?.description }}
          ></p>
          <span className={styles.pricein}>
            {property.price > 8000000 ? "Precio en USD" : ""}
          </span>
          <h2 className={styles.title_property}>Caracteristicas</h2>
          <div className={styles.specs}>
            <div>
              <i className="bx bx-home-heart"></i>
              <span>
                <p>Tipo de inmueble</p>
                <h3>{changeLanguage(property?.type)}</h3>
              </span>
            </div>
            <div>
              <i className="bx bx-bed"></i>
              <span>
                <p>Habitaciones</p>
                <h3>{property?.bedrooms}</h3>
              </span>
            </div>
            <div>
              <i className="bx bx-timer"></i>
              <span>
                <p>Antigüedad</p>
                <h3>
                  De{" "}
                  {property?.antiquity?.toString().length == 3
                    ? property?.antiquity.toString().substring(0, 1) +
                      "-" +
                      property?.antiquity.toString().substring(1)
                    : property?.antiquity.toString().substring(0, 2) +
                      "-" +
                      property?.antiquity.toString().substring(2)}{" "}
                  años
                </h3>
              </span>
            </div>
            <div>
              <i className="bx bx-chair"></i>
              <span>
                <p>Amueblado</p>
                <h3>No</h3>
              </span>
            </div>
            <div>
              <i className="bx bx-buildings"></i>
              <span>
                <p>Planta</p>
                <h3>{property?.floor} planta</h3>
              </span>
            </div>
            <div>
              <i className="bx bx-wrench"></i>
              <span>
                <p>Estado</p>
                <h3>{property?.propertyStatus}</h3>
              </span>
            </div>
          </div>

          <h2 className={styles.title_property}>
            {property?.city}, {property?.country}
          </h2>
          <div className={styles.map}>
            <Map
              location={{
                latitude: property.location.longitude,
                longitude: property.location.latitude,
              }}
            />
            <p>
              Itaaj Realty no se responsabiliza de los errores que la
              información mostrada a continuación pueda contener. La posición en
              el mapa puede ser aproximada por deseo del propietario. El usuario
              será el responsable del uso que dé a dicha información.
            </p>
          </div>
          {/* <iframe width="100%" height="640" frameBorder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowFullScreen scrolling="no" src="https://kuula.co/share/collection/7lqnK?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"></iframe> */}

          <h2 className={styles.title_property}>Propiedades similares...</h2>

          <div className={styles.properties_list}>
            {properties
              ?.filter(
                (prop: any) =>
                  prop.category == "general" && prop.slug !== property.slug
              )
              .slice(0, 3)
              .map((property: any) => (
                <PropertyCard key={property.uuid} {...property} />
              ))}
          </div>
        </div>
        <div className={styles.form_t}>
          <Cform
            slug={"PROP@" + params.slug}
          >
 <Link
                href={whatsappLink}
                target="_blank"
                className={styles.btn_whatsapp}
              >
                Escríbenos por Whatsapp
              </Link>

          </Cform>
        </div>
      </div>
      <Modal property={property.uuid} />

      {/* <Modal open={open} closeModal={() => setOpen(!open)} property={property.uuid} /> */}
    </>
  );
};

export default Property;
