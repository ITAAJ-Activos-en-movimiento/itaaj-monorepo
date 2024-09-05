import React from "react";
import styles from "./NeighborhoodGuide.module.css";
import {
  Search,
  Image,
  Map,
  ShoppingCart,
  Home,
  PlusSquare,
  Truck,
} from "react-feather";

const NeighborhoodGuide = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner_NeighborhoodGuide}>
        <img src="/landing_geo_hero.svg" className={styles.svg_img} alt="" />
        <div className={styles.info_banner_NG}>
          <h3>Encuentra tu barrio ideal para vivir en México</h3>
          <p>
            Itaaj Realty te ofrece toda la informacion que necesitas para que
            puedas decidir si un barrio es adecuado para ti y los tuyos
          </p>

          <div className={styles.container_search_NG}>
            <input className={styles.search_NG} type="search" />
            <button className={styles.button_banner_search_NG}>
              {" "}
              <Search /> Buscar
            </button>
          </div>
        </div>
      </div>
      <div className={styles.section_one}>
        <div className={styles.container_so}>
          <div className={styles.info_so}>
            <span>Galería y Street view</span>
            <h2>
              Adéntrate en el barrio con la galeria de fotos y Street view
            </h2>
            <div className={styles.icons_so}>
              <Image className={styles.icon_so} />
              <Map className={styles.icon_so} />
            </div>
            <p>
              Descubre el barrio a través de sus fotografias, plazas, parques,
              lugares de interés... También podras recorrer us calles mediante
              Street View.
            </p>
          </div>
          <div className={styles.container_img_so}>
            <img src="/img_so.png" alt="image phone on google maps" />
          </div>
        </div>
      </div>
      <div className={styles.section_one}>
        <div className={styles.container_so}>
          <div className={styles.container_img_so}>
            <img src="/img_st.png" alt="image phone on google maps" />
          </div>
          <div className={styles.info_st}>
            <span>Opiniones</span>
            <h2>¿Que opina la gente que vive en esa zona?</h2>
            <div className={styles.icons_st}>
              <img src="/img_so_start.png" alt="image phone on google maps" />
            </div>
            <p>
              Descubre el barrio a través de sus fotografias, plazas, parques,
              lugares de interés... También podras recorrer us calles mediante
              Street View.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.section_one}>
        <div className={styles.container_so}>
          <div className={styles.info_so}>
            <span>Mapa de servicios interactivo</span>
            <h2>Todos los servicios del barrio</h2>
            <div className={styles.icons_str}>
              <ShoppingCart className={styles.icon_so} />
              <Home className={styles.icon_so} />
              <PlusSquare className={styles.icon_so} />
              <Truck className={styles.icon_so} />
            </div>
            <p>
              Podrás ver si dispone de transporte público, supermercados,
              hospitales, farmacias, escuelas o universidades para asegurarte de
              que cumple con tus expectativas.
            </p>
          </div>
          <div className={styles.container_img_so}>
            <img src="/img_str.png" alt="image phone on google maps" />
          </div>
        </div>
      </div>
      <div className={styles.section_one}>
        <div className={styles.container_so}>
          <div className={styles.container_img_so}>
            <img src="/img_stf.png" alt="image phone on google maps" />
          </div>
          <div className={styles.info_so}>
            <span>Precios de la zona</span>
            <h2>Conoce el precio medio de alquiler o compra</h2>
            <div className={styles.icons_str}>
              <ShoppingCart className={styles.icon_so} />
              <Home className={styles.icon_so} />
              <PlusSquare className={styles.icon_so} />
              <Truck className={styles.icon_so} />
            </div>
            <p>
              Compara los precios medios de los distritos o barrios que te
              interesan para tener mayor seguridad cuando tomes una decisión.
            </p>
          </div>
        </div>
      </div>
    {/**  <div className={styles.section_end}>
        <div className={styles.container_section_end}>
          <div className={styles.info_end}>
            <h2>Estos son los barrios más populares</h2>
            <div className={styles.line}></div>
            <p>
              Compara los precios medios de los barrios que te interesan para
              tomar una decisión bien informada.
            </p>
          </div>
          <div className={styles.container_img_end}>
            <img src="/img_end.png" alt="" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NeighborhoodGuide;
