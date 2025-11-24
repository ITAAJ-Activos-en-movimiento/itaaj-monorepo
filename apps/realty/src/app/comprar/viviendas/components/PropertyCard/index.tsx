"use client";

import Link from "next/link";
import React from "react";
import styles from "./PropertyCard.module.css";
import Image from "next/image";
import { Property } from "@itaaj/entities";
import { DivisaFormater, changeLanguage } from "@/utils";
import { Mail } from "react-feather";

const PropertyCard = (property: Property) => {
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina https://itaajrealty.com`;
  // const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina ${window.location.href} por la siguiente propiedad ${window.location.href}/:slug`;

  return (
    <article className={styles.card}>
      <Link
        title=""
        href={`viviendas/${property.slug}`}
        className={styles.carousel}
      >
        <div className={styles.badge}>1/{property.images.length}</div>
        <div>
          <ul className={styles.image_list}>
            <li>
              <Image
                alt="Foto casa"
                src={property.images[0]}
                width={400}
                height={400}
              />
            </li>
          </ul>
        </div>
        <div className={styles.carousel_preview}>
          <div>
            <Image
              alt="Foto casa"
              src={property.images[1]}
              width={400}
              height={400}
            />
          </div>
          <div>
            <Image
              alt="Foto casa"
              src={property.images[2]}
              width={400}
              height={400}
            />
          </div>
        </div>
      </Link>
      <div className={styles.banner}>
        <h4>
          Itaaj Realty - <span>Experto inmobiliario</span>
        </h4>
      </div>
      <div className={styles.info}>
        <Link title="" href={`viviendas/${property.slug}`}>
          <h3 className={styles.header}>
            <span className={styles.price_composite}>
              <span className={styles.price}>
                {DivisaFormater({ value: property.price })}
              </span>
              <span className={styles.time_ago}>Novedad</span>
            </span>
            <span className={styles.title}>
              <span className={styles.type}>
                {changeLanguage(property.type)}
              </span>{" "}
              en {property.city}, {property.state}
            </span>
          </h3>
          <ul className={styles.features}>
            <li>
              <i className="bx bx-bed"></i> {property.bedrooms} habs.
            </li>
            <li>
              <i className="bx bx-bath"></i> {property.bathrooms} baños
            </li>
            <li>
              <i className="bx bx-area"></i> {property.area.building_area} m²{" "}
            </li>
            <li>
              <i className="bx bx-building"></i> {property.floor} Piso
            </li>
            <li>
              <i className="bx bx-car-garage"></i> {property.garage}{" "}
              Estaciona...
            </li>
          </ul>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: property.description }}
          ></p>
        </Link>

        <div className={styles.contact}>
          <div>
            <button>
              <Mail size={18} /> Contactar{" "}
            </button>
            <Link
              href={whatsappLink.replace(":slug", property.slug)}
              target="_blank"
            >
              <i style={{ fontSize: 18 }} className="bx bxl-whatsapp"></i>{" "}
              Mensaje
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
