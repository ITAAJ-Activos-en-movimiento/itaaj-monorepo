"use client"
import React from 'react'
import styles from "../../Buy.module.css"
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Pagination = ({ pages }: { pages: number }) => {
    const router = useRouter();
  const searchParams = useSearchParams();

  const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

  const applyFilters = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", value);

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.pagination}>
    {pagesArray.map((page: number) => (
      <span key={page}><button onClick={() => applyFilters(String(page))} style={{
        backgroundColor: Number(searchParams?.get("page")) == Number(page) ? "var(--main-color)" : "#fff",
        color: Number(searchParams?.get("page")) == Number(page) ? "#fff" : "#000"
      }}>{page} </button></span>
    ))}
  </div>
  )
}

export default Pagination