import React from "react";
import styles from "./MyAds.module.css";
import { getServerSession } from "@/core/session";
import { Property } from "@itaaj/entities";
import Image from "next/image";
import { DivisaFormater } from "@/utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const MyAds = async () => {
  const session = await getServerSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  let listings: Property[] = [];
  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_BASE}/properties/user/${session.user.id}`,
      {
        cache: "no-store",
        redirect: "manual",
      }
    );

    if (res.ok) {
      listings = (await res.json()) as Property[];
    } else {
      console.error("Error fetching user properties", res.status);
    }
  } catch (err) {
    console.error("Error fetching user properties", err);
  }

  const totalAds = listings.length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Mis anuncios</h1>
        <span className={styles.subheading}>
          Tienes {totalAds} anuncio{totalAds !== 1 ? "s" : ""}
        </span>
      </header>

      <div className={styles.layout}>
        <main className={styles.mainColumn}>
          <section className={styles.listingSection}>
            <h2 className={styles.sectionTitle}>Propiedades en venta</h2>

            {listings.map((listing: Property) => (
              <article className={styles.listingCard}>
                <div className={styles.listingImageWrapper}>
                  {listing?.images?.[0] ? (
                    <Image
                      src={listing?.images[0]}
                      width={600}
                      height={160}
                      alt="Foto"
                    />
                  ) : (
                    <div className={styles.listingIllustration} />
                  )}
                </div>

                <div className={styles.listingInfo}>
                  <div className={styles.listingHeader}>
                    <span className={styles.listingPrice}>
                      {DivisaFormater({ value: listing.price })} MXN
                    </span>
                  </div>
                  <p className={styles.listingLocation}>{listing.city}</p>
                  <p className={styles.listingMeta}>
                    {listing.area.total_area} m²
                  </p>

                  <div className={styles.listingActions}>
                    {/* <button className={styles.primaryButton}>
                      Validar teléfono
                    </button> */}
                    <button className={styles.iconButton}>Eliminar</button>
                    <button className={styles.iconButton}>Modificar</button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className={styles.visibilitySection}>
            <h2 className={styles.sectionTitle}>
              Mejora la visibilidad de tu anuncio
            </h2>
            <p className={styles.sectionDescription}>
              Aumenta las visitas a tu anuncio con los productos de visibilidad
              más efectivos.
            </p>

            <div className={styles.productCard}>
              <div>
                <h3 className={styles.productTitle}>Top seleccionado 7 días</h3>
                <p className={styles.productDescription}>
                  Sitúate entre los seleccionados en las primeras posiciones
                  durante 7 días.
                </p>
                <button className={styles.linkButton}>
                  Mostrar información
                </button>
              </div>
              <div className={styles.productAside}>
                <span className={styles.productPrice}>
                  {DivisaFormater({ value: 599 })} MXN
                </span>
                <button className={styles.primaryButton}>Comprar</button>
              </div>
            </div>
          </section>
        </main>

        <aside className={styles.sideColumn}>
          <section className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Publica otro anuncio</h3>
            <p className={styles.sideText}>
              Publica gratis hasta 2 anuncios de cada tipo (vivienda, garaje,
              etc.)
            </p>
            <button className={styles.outlineButton}>
              Publicar otro anuncio
            </button>
          </section>

          <section className={styles.sideCard}>
            <h3 className={styles.sideTitle}>¿Necesitas ayuda?</h3>
            <p className={styles.sideText}>
              Consulta la guía de preguntas habituales o contacta directamente
              con nosotros a través del chat.
            </p>
            <button className={styles.outlineButton}>
              Ir a la sección de ayuda
            </button>
          </section>

          <section className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Simulación de tasación online</h3>
            <p className={styles.sideText}>
              Valora tu piso gratis en el simulador para ayudarte a elegir mejor
              el precio de venta o alquiler para tu inmueble.
            </p>
            <button className={styles.outlineButton}>
              Obtener valoración gratis
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default MyAds;
