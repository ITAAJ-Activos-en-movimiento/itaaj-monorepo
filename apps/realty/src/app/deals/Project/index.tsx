import Link from "next/link";
import React from "react";
import styles from "./Project.module.css";
import { Feather } from "react-feather";
import Image from "next/image";

const Project = () => {
  return (
    <section className={styles.section}>
      <h2>Encuentra proyectos para invertir y crecer</h2>
      <div className={styles.content}>
        <article>
          <div className={styles.container} >
            <div className={styles.card} >
              <div className={styles.header} >
                <span className={styles.tag} ><Feather size={16} /> Quenda 32 días para subir el unit</span>
                <ul>
                  <li>
                    <h4>+15%</h4>
                    <p>Retorno estimado</p>
                  </li>
                  <li>
                    <h4>$120mil</h4>
                    <p>Valor $ por unit</p>
                  </li>
                  <li>
                    <h4>7</h4>
                    <p>Total de socios</p>
                  </li>
                </ul>
              </div>

              <h3 className={styles.title} >AJÁ AL KIMBILA</h3>
              <h5>Mérida, México / Etapa de construcción</h5>

              <p className={styles.copy} >
                Un bosque que te atiende de lunes a lunes, donde la turina se
                convierte en un buen café en las mañanas.
              </p>

              <p className={styles.price} >
                $ 4 Millones MXN / <span>Etapa 1 10% completada</span>
              </p>
              <div> </div>

              <button>Querio ser socio</button>
            </div>
            <div className={styles.picture} >

                <Image src="/av_imagen.webp" width={2000} height={1500} alt="Imagen"  />
            </div>
          </div>
          <div className={styles.time} >
            <p>
              Faltan para que suba el precio del unit{" "}
              <Link href="/">No te pierdas esta oportunidad</Link>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Project;
