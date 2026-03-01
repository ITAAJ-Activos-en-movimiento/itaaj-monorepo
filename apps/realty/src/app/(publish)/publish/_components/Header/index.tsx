import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { User } from "react-feather";
import { UserMenu } from "@/shared/components/header/parts/UserMenu";
import { getServerSession } from "@/core/session";

const Header = async () => {
  const session = await getServerSession();
  return (
    <header className={styles.header}>
      <div className={styles.options}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/isotipo.png"
            alt="Logo Itaaj Realty"
            width={20}
            height={40}
          />
          <h3>itaaj realty</h3>
        </Link>
      </div>
      <div className={styles.options}>
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
    </header>
  );
};

export default Header;
