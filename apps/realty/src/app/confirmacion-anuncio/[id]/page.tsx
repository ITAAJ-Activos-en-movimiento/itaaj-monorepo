import React from "react";
import styles from "./AdBoostPage.module.css";
import Link from "next/link";
import { Property } from "@itaaj/entities";
import Image from "next/image";
import { DivisaFormater } from "@/utils";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

export default async function AdBoostPageContainer({ params }: PageProps) {
  let listing: Property | null = null;

  try {
    const res = await fetch(
      `${process.env.INTERNAL_API_BASE}/properties/${params.id}/listing`,
      {
        cache: "no-store",
        redirect: "manual",
      }
    );

    if (!res.ok) {
      console.error("Error fetching listing", res.status);
    } else {
      listing = (await res.json()) as Property;
    }
  } catch (err) {
    console.error("Error fetching listing", err);
  }

  if (!listing) {
    return (
      <div className={styles.page}>
        <p>No se pudo cargar el anuncio...</p>
        <Link href="/user/mis-anuncios" className={styles.secondaryButton}>
          Volver
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className={styles.page}>
        <section className={styles.leftColumn}>
          <div className={styles.adCard}>
            <div className={styles.adImage}>
              {listing?.images?.[0] ? (
                <Image
                  src={listing?.images[0]}
                  width={600}
                  height={160}
                  alt="Foto"
                  priority
                />
              ) : (
                <div className={styles.adIllustration} />
              )}
            </div>

            <div className={styles.adInfo}>
              <div className={styles.priceRow}>
                <span className={styles.price}>
                  {DivisaFormater({ value: listing.price || 0 })} MXN
                </span>
                <span className={styles.badge}>TELF. PENDIENTE DE VALIDAR</span>
              </div>

              <p className={styles.adTitle}>{listing.city || ""}</p>
              <p className={styles.adMeta}>
                {listing.area?.total_area || 0} m²
              </p>

              <Link
                href="/user/mis-anuncios"
                className={styles.secondaryButton}
              >
                Ir a mis anuncios
              </Link>
            </div>
          </div>

          <div className={styles.adCreateCard}>
            <h3 className={styles.createTitle}>Publica otro anuncio</h3>
            <p className={styles.createText}>
              Publica gratis hasta 2 anuncios de cada tipo (vivienda, garaje,
              etc.)
            </p>

            <Link href="/publish" className={styles.outlineButton}>
              Publicar otro anuncio
            </Link>
          </div>
        </section>

        <section className={styles.centerColumn}>
          <h2 className={styles.sectionTitle}>
            Aumenta la visibilidad de tu anuncio
          </h2>

          <div className={styles.productRow}>
            <div className={styles.productMain}>
              <h3 className={styles.productTitle}>Top seleccionado 7 días</h3>
              <p className={styles.productDescription}>
                Sitúate entre los <strong>top seleccionados</strong> en las
                primeras posiciones durante 7 días.
              </p>
              <button type="button" className={styles.linkButton}>
                Mostrar información
              </button>
            </div>
            <div className={styles.productAside}>
              <span className={styles.productPrice}>
                {DivisaFormater({ value: 599 })} MXN
              </span>
              <button type="button" className={styles.primaryButton}>
                Comprar
              </button>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.productRow}>
            <div className={styles.productMain}>
              <h3 className={styles.productTitle}>Top seleccionado 30 días</h3>
              <p className={styles.productDescription}>
                Sitúate entre los <strong>top seleccionados</strong> en las
                primeras posiciones durante 30 días.
              </p>
              <button type="button" className={styles.linkButton}>
                Mostrar información
              </button>
            </div>
            <div className={styles.productAside}>
              <span className={styles.productPrice}>
                {" "}
                {DivisaFormater({ value: 2499 })} MXN
              </span>
              <button type="button" className={styles.primaryButton}>
                Comprar
              </button>
            </div>
          </div>
        </section>

        {/* Columna derecha: tasación */}
        <aside className={styles.rightColumn}>
          <div className={styles.valuationCard}>
            <h3 className={styles.valuationTitle}>
              Simulación de tasación online
            </h3>
            <p className={styles.valuationText}>
              Valora tu piso gratis en el simulador de Fotocasa para ayudarte a
              elegir mejor el precio de venta o alquiler para tu inmueble.
            </p>

            <button type="button" className={styles.secondaryButtonFull}>
              Obtener valoración gratis
            </button>
          </div>
        </aside>
      </div>
    </Suspense>
  );
}
