"use client";

import styles from "./Banner.module.css";
import { BannerSelect, Search } from "../../components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type TransactionType = "buy" | "rent" | "new" | "share";

const transactionToUrl: Record<TransactionType, string> = {
  buy: "comprar",
  rent: "rentar",
  new: "obra-nueva",
  share: "compartir",
};

const Banner = () => {
  const router = useRouter();

  const [transactionType, setTransactionType] =
    useState<TransactionType>("buy");
  const [propertyType, setPropertyType] = useState("viviendas");
  const [value, setValue] = useState("");

  const transactionSegment = transactionToUrl[transactionType];
  const propertySegment = propertyType;

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Lo bueno empieza buscando aquí</h2>
          <div>
            <div aria-label="Buscador de inmuebles" role="region">
              <div
                aria-label="Tipo de transacción"
                role="radiogroup"
                className={styles.options}
              >
                <label htmlFor="transactionTypeId-1" className={styles.option}>
                  <input
                    id="transactionTypeId-1"
                    type="radio"
                    value="buy"
                    name="transactionType"
                    defaultChecked
                    checked={transactionType === "buy"}
                    onChange={() => setTransactionType("buy")}
                  />
                  Comprar
                  <svg
                    aria-hidden="true"
                    fill="none"
                    role="presentation"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect></rect>
                  </svg>
                </label>
                <label htmlFor="transactionTypeId-2" className={styles.option}>
                  <input
                    id="transactionTypeId-2"
                    type="radio"
                    value="2"
                    name="transactionType"
                    checked={transactionType === "rent"}
                    onChange={() => setTransactionType("rent")}
                  />
                  Rentar
                  <svg
                    aria-hidden="true"
                    fill="none"
                    role="presentation"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect></rect>
                  </svg>
                </label>
                <label htmlFor="transactionTypeId-3" className={styles.option}>
                  <input
                    id="transactionTypeId-3"
                    type="radio"
                    value="3"
                    name="transactionType"
                  />
                  Obra nueva
                  <svg
                    aria-hidden="true"
                    fill="none"
                    role="presentation"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect></rect>
                  </svg>
                </label>
                <label htmlFor="transactionTypeId-4" className={styles.option}>
                  <input
                    id="transactionTypeId-4"
                    type="radio"
                    value="4"
                    name="transactionType"
                    checked={transactionType === "share"}
                    onChange={() => setTransactionType("share")}
                  />
                  Compartir
                  <svg
                    aria-hidden="true"
                    fill="none"
                    role="presentation"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect></rect>
                  </svg>
                </label>
              </div>
            </div>
            <div className={styles.containerSearch}>
              <BannerSelect value={propertyType} onChange={setPropertyType} />
              <Search
                value={value}
                onChange={setValue}
                transactionSegment={transactionSegment}
                propertySegment={propertySegment}
              />
            </div>
          </div>
          {/* <div className={styles.processes}>
            <div className={styles.grid}>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_neightborhood_guide_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Guía de barrios</span>
                </article>
              </Link>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_favorite_lists_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Lista de favoritos</span>
                </article>
              </Link>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_value_home_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Valora tu casa</span>
                </article>
              </Link>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_calculate_fee_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Calcula tu hipoteca</span>
                </article>
              </Link>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_protect_home_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Asegura tu hogar</span>
                </article>
              </Link>
              <Link href="/" className={styles.articleButton}>
                <article className={styles.article}>
                  <span className={styles.imageWrapper}>
                    {" "}
                    <Image
                      src="/images/home/home_services_sell_with_agency_icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />{" "}
                  </span>
                  <span>Vende con agencia</span>
                </article>
              </Link>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Banner;
