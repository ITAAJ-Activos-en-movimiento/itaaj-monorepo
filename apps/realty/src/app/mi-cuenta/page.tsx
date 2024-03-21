import styles from "./Account.module.css";
import React from "react";
import { NextPage } from "next";
import Image from "next/image";

//@ts-ignore
import Modal from "react-modal";
import { cardsData, userData } from "./data";
import Link from "next/link";

const MyAccount: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <p>Hola, {userData.name}</p>
            <span>{userData.email}</span>
            <button>Ver mi perfil</button>
          </div>

          <div className={styles.cards}>
            {cardsData.map((card) => (
              <Link key={card.icon} href={card.url} className={styles.container_card}>
                <div className={styles.image}>
                  <Image
                    src={card.icon}
                    width={20}
                    height={20}
                    alt={card.title}
                  />
                </div>

                <p>{card.title}</p>
                <span>{card.subtitle}</span>
              </Link>
            ))}
          </div>

          <div className={styles.info}>
            <p>¿Deseas realizar una nueva busqueda?</p>
            <Link href="/" className={styles.link}>
              Sumergete en la oferta inmobiliaria de Itaaj Realty
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <Image
            src="/gf.svg"
            width={850}
            height={220}
            alt="Calcula tu hipoteca"
          />
        </div>
      </div>
    </>
  );
};

export default MyAccount;
