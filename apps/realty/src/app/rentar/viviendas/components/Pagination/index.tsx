"use client";
import React from "react";
import styles from "../../Buy.module.css";
import { useRouter } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };

type PaginationProps = {
  pages: number;
  currentPage: number;
  searchParams: SearchParams;
};

const Pagination = ({ pages, currentPage, searchParams }: PaginationProps) => {
  const router = useRouter();

  const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

  const applyFilters = (value: string) => {
    const params = new URLSearchParams();

    // reconstruimos los searchParams que vienen del server
    Object.entries(searchParams).forEach(([key, val]) => {
      if (val === undefined) return;

      if (Array.isArray(val)) {
        val.forEach((v) => params.append(key, String(v)));
      } else {
        params.set(key, String(val));
      }
    });

    params.set("page", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.pagination}>
      {pagesArray.map((page) => (
        <span key={page}>
          <button
            onClick={() => applyFilters(String(page))}
            style={{
              backgroundColor:
                Number(currentPage) === Number(page)
                  ? "var(--main-color)"
                  : "#fff",
              color: Number(currentPage) === Number(page) ? "#fff" : "#000",
            }}
          >
            {page}
          </button>
        </span>
      ))}
    </div>
  );
};

export default Pagination;
