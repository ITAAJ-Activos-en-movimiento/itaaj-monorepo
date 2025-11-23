import React from "react";
import styles from "./Header.module.css";
import { ToggleButton } from "./parts";
import Link from "next/link";
import { Bell, Heart, Megaphone, User } from "lucide-react";
import { getServerSession } from "@/core/session";
import { UserMenu } from "./parts/UserMenu";

const Header = async () => {
  const session = await getServerSession();
  return (
    <header className={styles.header}>
      <div className={styles.separator}>
        <ToggleButton />
        <Link href="/" className={styles.brand}>
          <span className={styles.brandText}>itaaj realty</span>
        </Link>
        <nav className={styles.nav}>
          <Link
            className={styles.link}
            title="Comprar casas en Mexico"
            href="/comprar/viviendas"
          >
            Comprar
          </Link>
          <Link
            className={styles.link}
            title="Rentar casas en Mexico"
            href="/rentar/viviendas"
          >
            Rentar
          </Link>
          <Link
            className={styles.link}
            title="Vender"
            href="/vende-tu-propiedad"
          >
            Vender
          </Link>
          <Link className={styles.link} title="Itaaj Life" href="/actualidad">
            Actualidad
          </Link>
          <Link
            className={styles.link}
            title="Guia de Colonias"
            href="/guia-de-colonias"
          >
            Guia de Colonias
          </Link>
          <Link
            className={styles.link}
            title="Compara tu hipoteca"
            href="/hipotecas"
          >
            Hipotecas
          </Link>
        </nav>
      </div>
      <div className={styles.separator}>
        <Link
          className={styles.link}
          href="/user/alerts"
          title="Publica o modifica tus alertas de busqueda"
        >
          <Bell strokeWidth="1.5px" size={16} />
          <span>Mis alertas</span>
        </Link>
        <Link
          className={styles.link}
          href="/user/alerts"
          title="Publica o modifica tus alertas de busqueda"
        >
          <Heart strokeWidth="1.5px" size={16} />
          <span>Mis listas</span>
        </Link>
        <Link
          className={styles.link}
          href="/user/alerts"
          title="Publica o modifica tus alertas de busqueda"
        >
          <Megaphone strokeWidth="1.5px" size={16} />
          <span>Nuevos para ti</span>
        </Link>
        <div className={styles.buttons}>
          <Link
            className={`${styles.link} ${styles.publishBtn} `}
            href="/publish"
            title="Publica o modifica tus alertas de busqueda"
          >
            Publicar <span>anuncio gratis</span>
          </Link>
          {session ? (
            <UserMenu
              user={{
                name: session?.user.name,
                email: session?.user.email,
                avatar: "",
              }}
            />
          ) : (
            <Link
              className={`${styles.link} ${styles.accessBtn} `}
              href="/login"
              title="Publica o modifica tus alertas de busqueda"
            >
              <User strokeWidth="1.5px" size={16} />
              <span>Acceder</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
