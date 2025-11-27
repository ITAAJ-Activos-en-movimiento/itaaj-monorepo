import React from "react";
import styles from "./MyAds.module.css";
import { getServerSession } from "@/core/session";
import { Development, Property, User } from "@itaaj/entities";
import Image from "next/image";
import { DivisaFormater } from "@/utils";
import { redirect } from "next/navigation";
import Delete from "./Delete";
import Link from "next/link";
import { propertiesDevelopments } from "@/services";
const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];
export const dynamic = "force-dynamic";
type PropertyOrDevelopment = Property &
  Development & {
    itemType: "property" | "development";
  };
const MyAds = async ({
  searchParams,
}: {
  searchParams?: { state?: string };
}) => {
  const session = await getServerSession();

  if (!session?.user?.id) {
    redirect("/login");
  }
  const estadoBuscado = (searchParams?.state ?? "").toLowerCase().trim();

  let user: User;
  let usersById: Record<string, User> = {};

  const properties = await propertiesDevelopments({
    type: "",
    page: 1,
    limit: 140,
  });

  const ownerIds = Array.from(
    new Set(
      properties.items
        .map(
          (listing: PropertyOrDevelopment) =>
            listing.owner || (listing as any).userId
        )
        .filter(Boolean)
    )
  ) as string[];

  const userResponses = await Promise.all(
    ownerIds.map((id) =>
      fetch(`${process.env.INTERNAL_API_BASE}/users/${id}`, {
        cache: "no-store",
        redirect: "manual",
      })
    )
  );

  const users = await Promise.all(
    userResponses.map(async (res, index) => {
      if (!res.ok) {
        console.error(
          "Error fetching user",
          ownerIds[index],
          "status:",
          res.status
        );
        return null;
      }
      return (await res.json()) as User;
    })
  );

  users.forEach((user, index) => {
    if (user) {
      usersById[ownerIds[index]] = user;
    }
  });

  const totalAds = properties.items.filter(
    (property: PropertyOrDevelopment) =>
      property.lowDeposit > 0 && property.owner !== session?.user?.id
  ).length;

  const estadosUnicos = Array.from(
    new Set(
      properties.items
        .map((item: PropertyOrDevelopment) => item.state)
        .filter(Boolean)
    )
  ).sort();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Anuncios</h1>
        <span className={styles.subheading}>
          Hay {totalAds} anuncio{totalAds !== 1 ? "s" : ""}
        </span>
      </header>

      <form className={styles.searchBar} method="GET">
        <select
          name="state"
          defaultValue={searchParams?.state || ""}
          className={styles.searchInput}
        >
          <option value="">Todos los estados</option>
          {ESTADOS_MEXICO.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      <div className={styles.layout}>
        <main className={styles.mainColumn}>
          <section className={styles.listingSection}>
            <h2 className={styles.sectionTitle}>Propiedades en venta</h2>

            {properties.items
              .filter((property: PropertyOrDevelopment) => {
                const pasaDepositoYOwner =
                  property.lowDeposit > 0 &&
                  property.owner !== session?.user?.id;

                const pasaEstado =
                  !estadoBuscado ||
                  property.state?.toLowerCase() === estadoBuscado;

                return pasaDepositoYOwner && pasaEstado;
              })
              .map((listing: PropertyOrDevelopment) => {
                const ownerId =
                  (listing as any).owner || (listing as any).userId;
                const owner = ownerId ? usersById[ownerId] : undefined;

                return (
                  <article className={styles.listingCard} key={listing.id}>
                    <div className={styles.listingImageWrapper}>
                      {listing?.images?.[0] ? (
                        <Image
                          src={listing.images[0]}
                          width={600}
                          height={160}
                          alt="Foto"
                        />
                      ) : (
                        <div className={styles.listingIllustration} />
                      )}
                    </div>

                    <div className={styles.listingInfo}>
                      <span className={styles.percentage}>
                        Porcentaje compartido{" "}
                        {listing.lowDeposit ? listing.lowDeposit : 20}%
                      </span>

                      {/* INFO DEL USUARIO DUEÑO DE ESA PROPIEDAD */}
                      <div className={styles.userInfo}>
                        {owner ? (
                          <>
                            <span>
                              Nombre: {owner.name} {owner.lastname}
                            </span>
                            <span>Correo: {owner.email}</span>
                            <span>Teléfono: {owner.phone}</span>
                          </>
                        ) : (
                          <span>Usuario no disponible</span>
                        )}
                      </div>

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
                        <Link
                          href={`/${
                            listing.alsoRent ? "rentar" : "comprar"
                          }/viviendas/${listing.slug}`}
                          className={styles.iconButton}
                        >
                          Ver
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
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
